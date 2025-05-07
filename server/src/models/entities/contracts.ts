import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Room } from "./room";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.contracts)
    user: User;

    @ManyToOne(() => Room, (room) => room.users)
    room: Room;

    @Column({ type: "date" })
    start_date: string;

    @Column({ type: "date" })
    end_date: string;

    @Column()
    duration: number; //Hợp đồng bao tháng

    @Column({ type: "enum", enum: ["pending", "active", "terminated", "expired"], default: "pending" })
    status: string;

}
