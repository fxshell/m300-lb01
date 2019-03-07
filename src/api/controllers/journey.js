const axios = require("axios");
const moment = require("moment");

const { Journey } = require("../models/journey");

const ObjectId = require("mongoose").Types.ObjectId;

exports.get_journeys = (req, res, next) => {
    Journey.find()
        .then(journeys => {
            res.json(journeys);
        })
        .catch(error => {
            error.status = 500;
            throw error;
        });
};

exports.get_journey = (req, res, next) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        const error = new Error("Provided ID is invalid");
        error.status = 400;
        next(error);
        return;
    }

    Journey.findById(id)
        .then(journey => {
            if (!journey) {
                const error = new Error("Error while trying to find journey");
                throw error;
            } else {
                res.send(journey);
            }
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};

exports.save_journey = (req, res, next) => {
    const stationFrom = req.body.from;
    const stationTo = req.body.to;
    const departureTimestamp = req.body.departure;
    const trainName = req.body.name;

    if (!stationFrom || !stationFrom || !departureTimestamp || !trainName) {
        const error = new Error("Required body params missing");
        error.status = 400;
        next(error);
        return;
    }

    const formattedDepartureDate = moment.unix(departureTimestamp).format("YYYY-MM-DD HH:mm");

    axios
        .get(`http://transport.opendata.ch/v1/stationboard?id=${stationFrom}&datetime=${formattedDepartureDate}`)
        .then(response => {
            if (response.data.hasOwnProperty("stationboard")) {
                let foundJourney;

                for (const journey of response.data.stationboard) {
                    if (journey.name === trainName) {
                        foundJourney = journey;
                        break;
                    }
                }

                if (foundJourney) {
                    // Remove every station after to

                    const savePasslistArray = [];
                    let toStopFound = false;

                    for (const stop of foundJourney.passList) {
                        savePasslistArray.push(stop);

                        if (stop.station.id === stationTo) {
                            toStopFound = true;
                            break;
                        }
                    }

                    if (!toStopFound) {
                        const error = new Error("Stop station has not been found in journey");
                        error.status = 400;
                        throw error;
                    }

                    foundJourney.passList = savePasslistArray;

                    Journey.create(foundJourney)
                        .then(journey => {
                            res.json(journey);
                        })
                        .catch(error => {
                            error.status = 500;
                            throw error;
                        });
                } else {
                    console.log("Option 2");
                    const error = new Error(`${trainName} could not be found in the stationboard data`);
                    error.status = 400;
                    throw error;
                }
            } else {
                throw new Error("Something went wrong while trying to read data from the Open Transport API");
            }
        })
        .catch(error => {
            console.log(error.message);

            next(error);
        });
};
