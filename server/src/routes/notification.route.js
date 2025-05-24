const { Router } = require("express");
const NotificationController = require("../controller/notification.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

router.post("/admin-send-all", NotificationController.sendNotificationToAll);

//Gửi thông báo cá nhân (Admin)
router.post("/admin-send-user", NotificationController.sendNotificationToUser);

//Sinh viên xem thông báo của mình
router.get("/", authMiddleware, NotificationController.getUserNotifications);

//Đánh dấu thông báo đã đọc (Chỉ cho user hiện tại)
router.put("/mark-read/:notificationId", authMiddleware, NotificationController.markAsRead);

module.exports = router; 