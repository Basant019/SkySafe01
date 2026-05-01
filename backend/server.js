const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { testConnection } = require('./config/db');

// Import routes
const authRoutes     = require('./routes/authRoutes');
const weatherRoutes  = require('./routes/weatherRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const tripRoutes     = require('./routes/tripRoutes');
const reportRoutes   = require('./routes/reportRoutes');
const adminRoutes    = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const routeRoutes        = require('./routes/routeRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend Static Files ───────────────────────────
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'pages')));

// ── Test DB connection ────────────────────────────────────
testConnection();

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/weather',   weatherRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/trip',     tripRoutes);
app.use('/api/reports',   reportRoutes);
app.use('/api/admin',     adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/safe-route',    routeRoutes);

// ── Health Check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        message: 'SkySafe Backend API is running ✅',
        version: '2.0.0',
        features: ['JWT Auth', 'Role-based Access', 'Smart Disaster Routing', 'AI Trip Planning'],
        endpoints: {
            auth:      '/api/auth',
            weather:   '/api/weather',
            disasters: '/api/disasters',
            trip:      '/api/trip',
            reports:   '/api/reports',
            admin:     '/api/admin',
            notifications: '/api/notifications',
            safeRoute: '/api/safe-route'
        },
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// ── SPA Fallback: serve frontend pages ────────────────────
app.get('*', (req, res) => {
    // Avoid catching API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ success: false, message: 'API route not found.' });
    }
    // Serve login page as fallback
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'login.html'));
});

// ── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 SkySafe Server running on http://localhost:${PORT}`);
    console.log(`📋 API Endpoints:`);
    console.log(`   Auth:      http://localhost:${PORT}/api/auth`);
    console.log(`   Weather:   http://localhost:${PORT}/api/weather`);
    console.log(`   Disasters: http://localhost:${PORT}/api/disasters`);
    console.log(`   Trip:      http://localhost:${PORT}/api/trip`);
    console.log(`   Reports:   http://localhost:${PORT}/api/reports`);
    console.log(`   Admin:     http://localhost:${PORT}/api/admin`);
    console.log(`\n🛡️  Role-based access control: ACTIVE`);
    console.log(`🔐 JWT Authentication: ACTIVE\n`);
});