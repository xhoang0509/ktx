import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Room } from "./room";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "enum", enum: ["good", "broken", "deleted"], default: "good"})
    status: string;
}
