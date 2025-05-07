import { Request, Response } from "express";
import { NotificationService } from "../services/notificationService";
import { AuthRequest } from "../middleware/userMiddleware";

export class NotificationController {
    private readonly notificationSer: NotificationService;

    constructor() {
        this.notificationSer = new NotificationService();
    }

    //Gửi thông báo toàn KTX
    async sendNotificationToAll(req: Request, res: Response) {
        try {
            const { title, message } = req.body;
            await this.notificationSer.sendNotificationToAll(title, message);
            return res.status(201).json({ message: "Gửi thông báo toàn KTX thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi gửi thông báo", error: error.message });
        }
    }

    //Gửi thông báo cá nhân
    async sendNotificationToUser(req: Request, res: Response) {
        try {
            const { userId, title, message } = req.body;
            await this.notificationSer.sendNotificationToUser(userId, title, message);
            return res.status(201).json({ message: "Gửi thông báo cá nhân thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi gửi thông báo", error: error.message });
        }
    }

    //Sinh viên xem thông báo
    async getUserNotifications(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id; // Lấy ID từ token
            const notifications = await this.notificationSer.getUserNotifications(userId);
            return res.status(200).json({ notifications });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông báo", error: error.message });
        }
    }

    //Đánh dấu thông báo đã đọc
    async markAsRead(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id; // Lấy ID từ token
            const notificationId = parseInt(req.params.notificationId);
            await this.notificationSer.markAsRead(notificationId, userId);
            return res.status(200).json({ message: "Thông báo đã được đánh dấu là đã đọc" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi đánh dấu thông báo", error: error.message });
        }
    }
}
