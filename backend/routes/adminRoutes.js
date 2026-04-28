const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
});

module.exports = router;