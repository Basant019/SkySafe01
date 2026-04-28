const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_skysafe_2026';

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Require Admin Role' });
    }
};

module.exports = { verifyToken, verifyAdmin };
