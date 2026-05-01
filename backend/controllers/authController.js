const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_skysafe_2026';

// ─── Generate JWT ──────────────────────────────────────────
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// ─── Register User ─────────────────────────────────────────
const registerUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide full_name, email, and password.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        }

        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already registered. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
            [full_name, email, hashedPassword, 'user']
        );

        const newUser = { id: result.insertId, full_name, email, role: 'user' };

        res.status(201).json({
            success: true,
            message: 'Account created successfully! Welcome to SkySafe.',
            user: newUser,
            token: generateToken(newUser)
        });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration: ' + error.message });
    }
};

// ─── Login ─────────────────────────────────────────────────
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password.' });
        }

        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.full_name}!`,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.role === 'admin' ? '********@skysafe.com' : user.email,
                role: user.role,
                created_at: user.created_at
            },
            token: generateToken(user)
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login: ' + error.message });
    }
};

// ─── Get My Profile ────────────────────────────────────────
const getMyProfile = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = users[0];
        if (user.role === 'admin') user.email = '********@skysafe.com';
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// ─── Get User Profile by ID (admin or self) ───────────────
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const [users] = await pool.query(
            'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = users[0];
        if (user.role === 'admin') user.email = '********@skysafe.com';
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// ─── Change Password ───────────────────────────────────────
const changePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        if (!current_password || !new_password) {
            return res.status(400).json({ success: false, message: 'Please provide current and new password.' });
        }
        if (new_password.length < 6) {
            return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
        }

        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found.' });

        const isValid = await bcrypt.compare(current_password, users[0].password);
        if (!isValid) return res.status(401).json({ success: false, message: 'Current password is incorrect.' });

        const hashed = await bcrypt.hash(new_password, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);

        res.json({ success: true, message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Change Password Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { registerUser, loginUser, getMyProfile, getUserProfile, changePassword };