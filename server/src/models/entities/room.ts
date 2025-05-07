import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";
import { Device } from "./device";
import { RoomDevice } from "./room-devices";

@Entity()
export class Room {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender: string;

    @Column()
    max_capacity: number;

    @Column({ default: 0 }) 
    current_capacity: number; // Số sinh viên hiện tại trong phòng

    @Column("decimal", { precision: 10, scale: 2 }) 
    base_price: number; // Giá thuê phòng

    @OneToMany(() => RoomDevice, (roomDevice) => roomDevice.room)
    roomDevices: RoomDevice[];

    @OneToMany(() => User, (user) => user.room)
    users: User[]; 
}
