const { Notification } = require("../models/entities/notifications");
const { AppDataSource } = require("../models/db");
const { User } = require("../models/entities/user");

class NotificationService {
    constructor() {
        this.notificationRepo = AppDataSource.getRepository(Notification);
        this.userRepo = AppDataSource.getRepository(User);
    }

    //Admin
    //Gửi thông báo cho tất cả user trong KTX
    async sendNotificationToAll(title, message) {
        const students = await this.userRepo.find();
        const notifications = students.map((s) => {
            return this.notificationRepo.create({
                receiver: s,
                type: "all",
                title,
                message,
            });
        });

        return await this.notificationRepo.save(notifications);
    }

    //Gửi thông báo cho user được chỉ định
    async sendNotificationToUser(userId, title, message) {
        const user = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new Error("Không tìm thấy tài khoản");
        }

        const notification = await this.notificationRepo.create({
            receiver: user,
            type: "personal",
            title,
            message,
        });
        return await this.notificationRepo.save(notification);
    }

    //Sinh viên
    async getUserNotifications(userId) {
        return await this.notificationRepo.find({
            where: { receiver: { id: userId } },
            order: { created_at: "DESC" },
        });
    }

    async markAsRead(notificationId, userId) {
        const notification = await this.notificationRepo.findOne({
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
        return await this.notificationRepo.save(notification);
    }
}

module.exports = { NotificationService }; 