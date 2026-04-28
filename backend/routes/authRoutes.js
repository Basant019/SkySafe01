const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMyProfile, getUserProfile, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', verifyToken, getMyProfile);
router.get('/profile/:userId', verifyToken, getUserProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;