import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = jwt.verify(token, process.env.USER_SECRET_KEY as string);
        console.log("Decoded Token:", decoded); // 👀 Kiểm tra giá trị sub
        req.user = decoded;
        return next(); // ✅ Đảm bảo tất cả code paths return
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};
