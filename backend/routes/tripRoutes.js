// backend/routes/tripRoutes.js
const express = require("express");
const router = express.Router();
const { 
  planTrip, 
  saveTrip, 
  getUserTrips, 
  getAllTrips, 
  addTripUpdate, 
  getTripUpdates 
} = require("../controllers/tripController");

// POST /api/trip/plan — Generate AI itinerary
router.post("/plan", planTrip);

// POST /api/trip — Save a trip
router.post("/", saveTrip);

// GET /api/trip/all — Admin: Get all trips
router.get("/all", getAllTrips);

// GET /api/trip/user/:userId — User: Get own trips
router.get("/user/:userId", getUserTrips);

// POST /api/trip/:tripId/updates — Add update to trip
router.post("/:tripId/updates", addTripUpdate);

// GET /api/trip/:tripId/updates — Get updates for trip
router.get("/:tripId/updates", getTripUpdates);

module.exports = router;