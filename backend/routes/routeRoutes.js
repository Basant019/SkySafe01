const express = require('express');
const router = express.Router();
const { getSafeRoute } = require('../controllers/routeController');

// POST /api/safe-route
// Get a safe route between source and destination
router.post('/', getSafeRoute);

module.exports = router;
