// backend/routes/tripRoutes.js
const express = require("express");
const router = express.Router();
const { planTrip } = require("../controllers/tripController");

// POST /api/trip/plan
router.post("/plan", planTrip);

module.exports = router;