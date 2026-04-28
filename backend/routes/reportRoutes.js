const express = require('express');
const router = express.Router();
const {
    createReport,
    getUserReports,
    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport
} = require('../controllers/reportController');

// POST /api/reports — User submits a disaster report
router.post('/', createReport);

// GET /api/reports — Admin: get all reports (with optional ?status=&severity=&disaster_type=&location=)
router.get('/', getAllReports);

// GET /api/reports/user/:userId — User: get their own reports
router.get('/user/:userId', getUserReports);

// GET /api/reports/:id — Get single report detail
router.get('/:id', getReportById);

// PUT /api/reports/:id/status — Admin: update report status + notes
router.put('/:id/status', updateReportStatus);

// DELETE /api/reports/:id — Admin: delete a report
router.delete('/:id', deleteReport);

module.exports = router;
