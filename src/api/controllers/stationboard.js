const axios = require("axios");

exports.get_stationboard = (req, res, next) => {
    const station = req.query.station;
    const datetime = req.query.datetime;

    if (!station || !datetime) {
        const error = new Error("Required query params missing");
        error.status = 400;
        next(error);
        return;
    }

    axios
        .get(`http://transport.opendata.ch/v1/stationboard?station=${station}&datetime=${datetime}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error.message);

            next(error);
        });
};
