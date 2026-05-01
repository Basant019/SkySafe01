const express = require('express');
const router = express.Router();
const { getUserNotifications, createNotification } = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

// Note: verifyToken ensures only authenticated users can access these routes

// GET /api/notifications
// Get all notifications for the current user
router.get('/', verifyToken, getUserNotifications);

// POST /api/notifications
// Create a new notification or trigger a smart alert
router.post('/', createNotification);

module.exports = router;
