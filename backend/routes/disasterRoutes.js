const express = require('express');
const router = express.Router();
const {
    createAlert,
    getActiveAlerts,
    getAlertsByLocation,
    updateAlertStatus,
    subscribeToAlerts,
    getUserSubscriptions
} = require('../controllers/disasterController');

// POST /api/disasters/alerts
router.post('/alerts', createAlert);

// GET /api/disasters/alerts?location=&severity=
router.get('/alerts', getActiveAlerts);

// GET /api/disasters/alerts/location/:location
router.get('/alerts/location/:location', getAlertsByLocation);

// PUT /api/disasters/alerts/:alertId/status
router.put('/alerts/:alertId/status', updateAlertStatus);

// POST /api/disasters/subscribe
router.post('/subscribe', subscribeToAlerts);

// GET /api/disasters/subscriptions/:userId
router.get('/subscriptions/:userId', getUserSubscriptions);

module.exports = router;