import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Violation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.violations)
    user: User;

    @Column({ type: "enum", enum: ["reward", "punishment"] })
    type: string;

    @Column("text")
    description: string;
}
