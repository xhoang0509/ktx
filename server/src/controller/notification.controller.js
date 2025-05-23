const NotificationService = require("../services/notification.service");

const NotificationController = {
    //Gửi thông báo toàn KTX
    async sendNotificationToAll(req, res) {
        try {
            const { title, message } = req.body;
            await NotificationService.sendNotificationToAll(title, message);
            return res.status(200).json({ message: "Gửi thông báo toàn KTX thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi gửi thông báo", error: error.message });
        }
    },

    //Gửi thông báo cá nhân
    async sendNotificationToUser(req, res) {
        try {
            const { userId, title, message } = req.body;
            await NotificationService.sendNotificationToUser(userId, title, message);
            return res.status(200).json({ message: "Gửi thông báo cá nhân thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi gửi thông báo", error: error.message });
        }
    },

    //Sinh viên xem thông báo
    async getUserNotifications(req, res) {
        try {
            const userId = req.user?.id; // Lấy ID từ token
            const notifications = await NotificationService.getUserNotifications(userId);
            return res.status(200).json({ notifications });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông báo", error: error.message });
        }
    },

    //Đánh dấu thông báo đã đọc
    async markAsRead(req, res) {
        try {
            const userId = req.user?.id; // Lấy ID từ token
            const notificationId = parseInt(req.params.notificationId);
            await NotificationService.markAsRead(notificationId, userId);
            return res.status(200).json({ message: "Thông báo đã được đánh dấu là đã đọc" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi đánh dấu thông báo", error: error.message });
        }
    },
}

module.exports = NotificationController