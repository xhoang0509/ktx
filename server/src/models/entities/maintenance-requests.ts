import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomDevice } from "./room-devices";
import { User } from "./user";

@Entity()
export class MaintenanceRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RoomDevice)
    roomDevice: RoomDevice;

    @ManyToOne(() => User)
    user: User;

    @Column()
    description: string;

    @Column({ type: "enum", enum: ["pending", "in_progress", "completed"], default: "pending" })
    status: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}