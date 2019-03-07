const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stationboardRoutes = require("./api/routes/stationboard");
const journeyRoutes = require("./api/routes/journey");
const statsRoutes = require("./api/routes/stats");

mongoose.connect("mongodb://p3cs:HgxSY82aCug7vgPoop6CIOg@ds349065.mlab.com:49065/train-tracker", {
    useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/stationboard", stationboardRoutes);
app.use("/journey", journeyRoutes);
app.use("/stats", statsRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
