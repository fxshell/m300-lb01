const express = require("express");
const router = express.Router();

const JourneyController = require("../controllers/journey");

router.get("/", JourneyController.get_journeys);
router.get("/:id", JourneyController.get_journey);
router.post("/", JourneyController.save_journey);

module.exports = router;
