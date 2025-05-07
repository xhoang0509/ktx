import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { Room } from "./room";

@Entity()
export class DormitoryContract {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.contracts)
    student: User;

    @ManyToOne(() => Room, (room) => room.contracts)
    room: Room;

    @Column({ type: "enum", enum: ["pending", "approved", "rejected"], default: "pending" })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}
