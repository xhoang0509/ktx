const jwt = require("jsonwebtoken");
const logger = require("../logger");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (error) {
        logger.error(__filename, 'authMiddleware', error.message);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

module.exports = { authMiddleware }; 