import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room";
import { Device } from "./device";

@Entity()
export class RoomDevice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Room, (room) => room.roomDevices)
    room: Room;

    @ManyToOne(() => Device)
    device: Device;

    @Column()
    quantity: number;

    @Column({ type: "enum", enum: ["good", "broken", "under_maintenance"] })
    condition: string;
}