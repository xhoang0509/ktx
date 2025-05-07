import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Room } from "./room";
import { Contract } from "./contracts";
import { Payment } from "./payments";
import { Request } from "./requests";
import { Violation } from "./violations";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "enum", enum: ["male", "female", "other"], default: "other" })
    gender: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ unique: true })
    student_id: string;

    @Column()
    avatar: string;

    @Column({ type: "enum", enum: ["active", "inactive", "graduated", "deleted"], default: "active" })
    status: string;

    @ManyToOne(() => Room, (room) => room.users)
    room: Room;

    @OneToMany(() => Contract, (contract) => contract.user)
    contracts: Contract[];

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];

    @OneToMany(() => Request, (request) => request.user)
    requests: Request[];

    @OneToMany(() => Violation, (violation) => violation.user)
    violations: Violation[];
}
