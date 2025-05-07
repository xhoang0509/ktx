import { Router } from "express";
import { NotificationController } from "../controller/notificationController";
import { authMiddleware } from "../middleware/userMiddleware";

const router = Router();
const notificationController = new NotificationController();

router.post("/admin-send-all", notificationController.sendNotificationToAll.bind(notificationController));

//Gửi thông báo cá nhân (Admin)
router.post("/admin-send-user", notificationController.sendNotificationToUser.bind(notificationController));

//Sinh viên xem thông báo của mình
router.get("/", authMiddleware, notificationController.getUserNotifications.bind(notificationController));

//Đánh dấu thông báo đã đọc (Chỉ cho user hiện tại)
router.put("/mark-read/:notificationId", authMiddleware, notificationController.markAsRead.bind(notificationController));

export default router;