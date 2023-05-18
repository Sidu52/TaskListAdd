const jwt = require('jsonwebtoken');
function isAuthenticated(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    jwt.verify(token, "Sidhu", (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        req.user = decoded.user;
        next();
    });
}
module.exports = { isAuthenticated };
