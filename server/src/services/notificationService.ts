import { Repository } from "typeorm";
import { Notification } from "../models/entities/notifications";
import { AppDataSource } from "../models/db";
import { User } from "../models/entities/user";

export class NotificationService {
    private readonly notificationRepo: Repository<Notification>;
    private readonly userRepo: Repository<User>;

    constructor() {
        this.notificationRepo = AppDataSource.getRepository(Notification);
        this.userRepo = AppDataSource.getRepository(User);
    }

    //Admin
    //Gửi thông báo cho tất cả user trong KTX
    async sendNotificationToAll(title: string, message: string): Promise<any> {
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
    async sendNotificationToUser(userId: number, title: string, message: string): Promise<any> {
        const user = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new Error("KHông tìm thấy tài khoản");
        }

        const notification = await this.notificationRepo.create({
            receiver: user,
            type: "personal",
            title:
            message,
        });
        return await this.notificationRepo.save(notification);
    }

    //Sinh viên
    async getUserNotifications(userId: number) {
        return await this.notificationRepo.find({
            where: { receiver: { id: userId } },
            order: { created_at: "DESC" },
        });
    }

    async markAsRead(notificationId: number, userId: number): Promise<any> {
        const notification = await this.notificationRepo.findOne({
            where: {
                id: notificationId,
                receiver: {
                    id: userId,
                },
            },
        });
        if (!notification) {
            throw new Error("KHông tìm thấy bản ghi");
        }

        notification.is_read = true;
        return await this.notificationRepo.save(notification);
    }
}