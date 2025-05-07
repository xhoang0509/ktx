import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Room } from "./room";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.payments)
    user: User;

    @ManyToOne(() => Room, (room) => room.id)
    room: Room; // Liên kết với phòng

    @Column("decimal", { precision: 10, scale: 2 })
    rent_amount: number; // Tiền phòng

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    utility_amount: number; // Tiền điện nước chia đều

    @Column("decimal", { precision: 10, scale: 2 })
    total_amount: number; // Tổng số tiền sinh viên phải đóng

    @Column({ type: "enum", enum: ["VNPay", "cash", "bank_transfer"], nullable: true })
    payment_method: string;

    @Column({ type: "enum", enum: ["pending", "completed", "failed"], default: "pending" })
    status: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    payment_date: Date;

    @Column()
    month: number; // Tháng của hóa đơn

    @Column()
    year: number; // Năm của hóa đơn

    @Column({ type: "boolean", default: false })
    is_settled: boolean; // Đánh dấu đã thanh toán hay chưa
}
