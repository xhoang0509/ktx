const { UserModel, NotificationModel } = require("../models/db");

const NotificationService = {
    //Admin
    //Gửi thông báo cho tất cả user trong KTX
    async sendNotificationToAll(title, message) {
        const students = await UserModel.find();
        const notifications = students.map((s) => {
            return NotificationModel.create({
                receiver: s,
                type: "all",
                title,
                message,
            });
        });

        return await NotificationModel.save(notifications);
    },

    //Gửi thông báo cho user được chỉ định
    async sendNotificationToUser(userId, title, message) {
        const user = await UserModel.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new Error("Không tìm thấy tài khoản");
        }

        const notification = await NotificationModel.create({
            receiver: user,
            type: "personal",
            title,
            message,
        });
        return await NotificationModel.save(notification);
    },

    //Sinh viên
    async getUserNotifications(userId) {
        return await NotificationModel.find({
            where: { receiver: { id: userId } },
            order: { created_at: "DESC" },
        });
    },

    async markAsRead(notificationId, userId) {
        const notification = await NotificationModel.findOne({
            where: {
                id: notificationId,
                receiver: {
                    id: userId,
                },
            },
        });
        if (!notification) {
            throw new Error("Không tìm thấy bản ghi");
        }

        notification.is_read = true;
        return await NotificationModel.save(notification);
    },
}

module.exports = NotificationService