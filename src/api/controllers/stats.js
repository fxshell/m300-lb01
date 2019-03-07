const moment = require("moment");

const { Journey } = require("../models/journey");

exports.get_stats = (req, res, next) => {
    console.log("Get stats");

    Journey.find()
        .then(journeys => {
            const distance = this.calculateDistance(journeys);
            const time = this.calculateTime(journeys);

            res.json({
                distance: { display: "Distance", value: distance, unit: "km" },
                time: { display: "Time", value: time, unit: "hours" },
            });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};

this.calculateTime = journeys => {
    let totalTime = 0.0;

    journeys.forEach(journey => {
        const startTimestamp = journey.passList[0].departureTimestamp;
        const endTimestamp = journey.passList[journey.passList.length - 1].arrivalTimestamp;

        const startDate = moment(startTimestamp);
        const endDate = moment(endTimestamp);

        totalTime += moment.duration(endDate.diff(startDate)).asHours();
    });

    const timeRounded = totalTime.toFixed(1);

    return timeRounded;
};

this.calculateDistance = journeys => {
    let totalDistance = 0.0;

    journeys.forEach(journey => {
        let previousPoint = { x: null, y: null };

        journey.passList.forEach(stop => {
            const { x, y } = stop.location.coordinate;

            if ((previousPoint.x && previousPoint.y) != null) {
                const currentPoint = { x, y };
                const distance = this.calculateDistanceForCoordinates(previousPoint, currentPoint);
                totalDistance += distance;
            }

            previousPoint = { x, y };
        });
    });

    const distanceRounded = (totalDistance / 1000).toFixed(1);

    return distanceRounded;
};

// In Metres
this.calculateDistanceForCoordinates = (pointA, pointB) => {
    const lat1 = pointA.y;
    const lon1 = pointA.x;

    const lat2 = pointB.y;
    const lon2 = pointB.x;

    const R = 6371e3; // metres
    const φ1 = this.toRadians(lat1);
    const φ2 = this.toRadians(lat2);
    const Δφ = this.toRadians(lat2 - lat1);
    const Δλ = this.toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

this.toRadians = number => {
    return (number * Math.PI) / 180;
};
