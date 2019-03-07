const express = require("express");
const router = express.Router();

const StationboardController = require("../controllers/stationboard");

router.get("/", StationboardController.get_stationboard);

module.exports = router;
