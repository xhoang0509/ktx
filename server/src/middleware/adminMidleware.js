const jwt = require("jsonwebtoken");
const logger = require("../logger");

const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        req.admin = decoded;
        return next();
    } catch (error) {
        logger.error(__filename, 'adminAuthMiddleware', error.message);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

module.exports = adminAuthMiddleware 