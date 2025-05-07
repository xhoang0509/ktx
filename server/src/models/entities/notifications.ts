import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { Admin } from "./admin";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Admin, { nullable: true }) // Người gửi (Admin)
    sender: Admin;

    @ManyToOne(() => User, { nullable: true }) // Người nhận (Sinh viên)
    receiver: User;

    @Column({ type: "enum", enum: ["all", "personal"], default: "all" })
    type: string; // "all" -> Thông báo chung, "personal" -> Thông báo cá nhân

    @Column()
    title: string;

    @Column("text")
    message: string;

    @Column({ default: false })
    is_read: boolean;

    @CreateDateColumn()
    created_at: Date;
}
