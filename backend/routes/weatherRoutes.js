const express = require('express');
const router = express.Router();
const {
    getCurrentWeather,
    getWeatherForecast,
    saveLocation,
    getSavedLocations
} = require('../controllers/weatherController');

// GET /api/weather/current?city=London or ?lat=...&lon=...
router.get('/current', getCurrentWeather);

// GET /api/weather/forecast?city=London
router.get('/forecast', getWeatherForecast);

// POST /api/weather/save-location
router.post('/save-location', saveLocation);

// GET /api/weather/locations/:userId
router.get('/locations/:userId', getSavedLocations);

module.exports = router;