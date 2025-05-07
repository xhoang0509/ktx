import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.requests)
    user: User;

    @Column({ type: "enum", enum: ["repair", "complaint", "suggestion", "leave_dorm", "guest_visit"] }) // Thêm loại leave_dorm
    category: string;

    @Column("text")
    description: string;

    @Column({ type: "enum", enum: ["pending", "in_progress", "resolved", "approved", "rejected"], default: "pending" }) // Thêm trạng thái approved & rejected
    status: string;
}
