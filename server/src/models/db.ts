import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Admin } from "./entities/admin";
import { Contract } from "./entities/contracts";
import { Device } from "./entities/device";
import { Notification } from "./entities/notifications";
import { Payment } from "./entities/payments";
import { Request } from "./entities/requests";
import { User } from "./entities/user";
import { Violation } from "./entities/violations";
import { Room } from "./entities/room";
import { RoomDevice } from "./entities/room-devices";
import { MaintenanceRequest } from "./entities/maintenance-requests";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) as number,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    // migrationsRun: true,
    logging: false,
    entities: [
        Admin,
        Contract,
        Device,
        Notification,
        Payment,
        Request,
        Room,
        User,
        Violation,
        RoomDevice,
        MaintenanceRequest,
    ],
    migrations: ["./migrations/*.ts"],
    subscribers: [],
});
