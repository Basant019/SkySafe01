const { pool } = require('../config/db');

// Create disaster alert (admin only)
const createAlert = async (req, res) => {
    try {
        const {
            alert_type,
            severity,
            location,
            description,
            latitude,
            longitude,
            effective_date,
            expires_at,
            created_by
        } = req.body;

        // Validation
        if (!alert_type || !severity || !location || !description || !effective_date) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO disaster_alerts 
            (alert_type, severity, location, description, latitude, longitude, effective_date, expires_at, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [alert_type, severity, location, description, latitude || null, longitude || null, effective_date, expires_at || null, created_by || null]
        );

        res.status(201).json({
            success: true,
            message: 'Disaster alert created successfully',
            alert_id: result.insertId
        });

    } catch (error) {
        console.error('Create Alert Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all active alerts
const getActiveAlerts = async (req, res) => {
    try {
        const { location, severity } = req.query;
        let query = 'SELECT * FROM disaster_alerts WHERE is_active = TRUE';
        const params = [];

        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        if (severity) {
            query += ' AND severity = ?';
            params.push(severity);
        }

        query += ' ORDER BY created_at DESC';

        const [alerts] = await pool.query(query, params);

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts: alerts
        });

    } catch (error) {
        console.error('Get Alerts Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get alerts by location
const getAlertsByLocation = async (req, res) => {
    try {
        const { location } = req.params;

        const [alerts] = await pool.query(
            `SELECT * FROM disaster_alerts 
             WHERE is_active = TRUE 
             AND (location LIKE ? OR location = ?)
             ORDER BY 
                FIELD(severity, 'critical', 'high', 'medium', 'low'),
                created_at DESC`,
            [`%${location}%`, location]
        );

        res.status(200).json({
            success: true,
            location: location,
            alerts: alerts
        });

    } catch (error) {
        console.error('Get Location Alerts Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update alert status
const updateAlertStatus = async (req, res) => {
    try {
        const { alertId } = req.params;
        const { is_active } = req.body;

        await pool.query(
            'UPDATE disaster_alerts SET is_active = ? WHERE id = ?',
            [is_active, alertId]
        );

        res.status(200).json({
            success: true,
            message: 'Alert status updated successfully'
        });

    } catch (error) {
        console.error('Update Alert Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Subscribe to alerts
const subscribeToAlerts = async (req, res) => {
    try {
        const { user_id, alert_type, location } = req.body;

        const [result] = await pool.query(
            'INSERT INTO alert_subscriptions (user_id, alert_type, location) VALUES (?, ?, ?)',
            [user_id, alert_type || null, location || null]
        );

        res.status(201).json({
            success: true,
            message: 'Subscribed to alerts successfully',
            subscription_id: result.insertId
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Already subscribed to these alerts'
            });
        }
        console.error('Subscribe Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get user's subscriptions
const getUserSubscriptions = async (req, res) => {
    try {
        const { userId } = req.params;

        const [subscriptions] = await pool.query(
            'SELECT * FROM alert_subscriptions WHERE user_id = ? AND is_active = TRUE',
            [userId]
        );

        res.status(200).json({
            success: true,
            subscriptions: subscriptions
        });

    } catch (error) {
        console.error('Get Subscriptions Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    createAlert,
    getActiveAlerts,
    getAlertsByLocation,
    updateAlertStatus,
    subscribeToAlerts,
    getUserSubscriptions
};