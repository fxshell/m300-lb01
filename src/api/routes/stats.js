const express = require("express");
const router = express.Router();

const StatsController = require("../controllers/stats");

router.get("/", StatsController.get_stats);

module.exports = router;
