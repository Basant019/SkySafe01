const { pool } = require('../config/db');

// POST /api/reports — User submits a disaster report
const createReport = async (req, res) => {
    try {
        const {
            user_id,
            disaster_type,
            severity,
            location,
            latitude,
            longitude,
            description,
            photo_url
        } = req.body;

        if (!user_id || !disaster_type || !severity || !location || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: user_id, disaster_type, severity, location, description'
            });
        }

        const severityMap = {
            low: 'low',
            moderate: 'medium',
            medium: 'medium',
            high: 'high',
            extreme: 'critical',
            critical: 'critical'
        };
        const normalizedSeverity = severityMap[severity?.toLowerCase()] || null;

        if (!normalizedSeverity) {
            return res.status(400).json({ success: false, message: 'Invalid severity value' });
        }

        const [result] = await pool.query(
            `INSERT INTO disaster_reports 
            (user_id, disaster_type, severity, location, latitude, longitude, description, photo_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, disaster_type, normalizedSeverity, location, latitude || null, longitude || null, description, photo_url || null]
        );

        res.status(201).json({
            success: true,
            message: 'Disaster report submitted successfully',
            report_id: result.insertId
        });

    } catch (error) {
        console.error('Create Report Error:', error);
        res.status(500).json({ success: false, message: 'Server error while submitting report' });
    }
};

// GET /api/reports/user/:userId — User sees their own reports
const getUserReports = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;

        let query = `
            SELECT dr.*, u.full_name as user_name, a.full_name as admin_name
            FROM disaster_reports dr
            LEFT JOIN users u ON dr.user_id = u.id
            LEFT JOIN users a ON dr.admin_id = a.id
            WHERE dr.user_id = ?
        `;
        const params = [userId];

        if (status) {
            query += ' AND dr.status = ?';
            params.push(status);
        }

        query += ' ORDER BY dr.created_at DESC';

        const [reports] = await pool.query(query, params);

        res.status(200).json({ success: true, count: reports.length, reports });

    } catch (error) {
        console.error('Get User Reports Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/reports — Admin gets all reports with optional filters
const getAllReports = async (req, res) => {
    try {
        const { status, severity, disaster_type, location } = req.query;

        let query = `
            SELECT dr.*, u.full_name as user_name, u.email as user_email, a.full_name as admin_name
            FROM disaster_reports dr
            LEFT JOIN users u ON dr.user_id = u.id
            LEFT JOIN users a ON dr.admin_id = a.id
            WHERE 1=1
        `;
        const params = [];

        if (status) { query += ' AND dr.status = ?'; params.push(status); }
        if (severity) { query += ' AND dr.severity = ?'; params.push(severity); }
        if (disaster_type) { query += ' AND dr.disaster_type = ?'; params.push(disaster_type); }
        if (location) { query += ' AND dr.location LIKE ?'; params.push(`%${location}%`); }

        query += ' ORDER BY dr.created_at DESC';

        const [reports] = await pool.query(query, params);

        // Stats
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(status = 'pending') as pending,
                SUM(status = 'reviewing') as reviewing,
                SUM(status = 'resolved') as resolved,
                SUM(status = 'rejected') as rejected
            FROM disaster_reports
        `);

        res.status(200).json({ success: true, count: reports.length, stats: stats[0], reports });

    } catch (error) {
        console.error('Get All Reports Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/reports/:id — Get a single report detail
const getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        const [reports] = await pool.query(`
            SELECT dr.*, u.full_name as user_name, u.email as user_email, a.full_name as admin_name
            FROM disaster_reports dr
            LEFT JOIN users u ON dr.user_id = u.id
            LEFT JOIN users a ON dr.admin_id = a.id
            WHERE dr.id = ?
        `, [id]);

        if (reports.length === 0) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        res.status(200).json({ success: true, report: reports[0] });

    } catch (error) {
        console.error('Get Report Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/reports/:id/status — Admin updates report status and adds notes
const updateReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, admin_notes, admin_id } = req.body;

        const validStatuses = ['pending', 'reviewing', 'resolved', 'rejected'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        await pool.query(
            `UPDATE disaster_reports 
             SET status = ?, admin_notes = ?, admin_id = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [status, admin_notes || null, admin_id || null, id]
        );

        res.status(200).json({ success: true, message: `Report marked as ${status}` });

    } catch (error) {
        console.error('Update Report Status Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// DELETE /api/reports/:id — Admin can delete a report
const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM disaster_reports WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Report deleted' });
    } catch (error) {
        console.error('Delete Report Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    createReport,
    getUserReports,
    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport
};
