const { pool } = require("../config/db");
const { createAndSendNotification, triggerConditionBasedAlerts } = require("../services/notificationService");

// GET /api/notifications
// Get all notifications for the logged-in user
const getUserNotifications = async (req, res) => {
    try {
        // Assume req.user is set by authMiddleware
        const userId = req.user.id; 
        
        const [notifications] = await pool.query(
            "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
            [userId]
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });
    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// POST /api/notifications
// Manually create a new notification (or trigger a smart one)
const createNotification = async (req, res) => {
    try {
        const { user_id, type, title, message, send_email, user_email, condition, location } = req.body;

        if (!user_id) {
            return res.status(400).json({ success: false, message: "user_id is required" });
        }

        let notificationId;

        // If condition is provided, use the smart logic
        if (condition && location) {
            notificationId = await triggerConditionBasedAlerts(user_id, user_email, condition, location);
            if (!notificationId) {
                return res.status(200).json({ success: true, message: "Condition did not trigger any alerts." });
            }
        } else {
            // Otherwise, create a manual notification
            if (!title || !message) {
                return res.status(400).json({ success: false, message: "title and message are required" });
            }
            notificationId = await createAndSendNotification(
                user_id, 
                type || 'general', 
                title, 
                message, 
                send_email || false, 
                user_email
            );
        }

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification_id: notificationId
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getUserNotifications,
    createNotification
};
