require("reflect-metadata");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
const { Admin } = require("./entities/admin");
const { Contract } = require("./entities/contracts");
const { Device } = require("./entities/device");
const { Notification } = require("./entities/notifications");
const { Payment } = require("./entities/payments");
const { Request } = require("./entities/requests");
const { User } = require("./entities/user");
const { Violation } = require("./entities/violations");
const { Room } = require("./entities/room");
const { RoomDevice } = require("./entities/room-devices");
const { MaintenanceRequest } = require("./entities/maintenance-requests");
const { Bill } = require("./entities/bill");

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
        Bill
    ],
    migrations: ["./migrations/*.js"],
    subscribers: [],
});


module.exports = {
    AppDataSource,
    AdminModel: AppDataSource.getRepository(Admin),
    ContractModel: AppDataSource.getRepository(Contract),
    DeviceModel: AppDataSource.getRepository(Device),
    NotificationModel: AppDataSource.getRepository(Notification),
    PaymentModel: AppDataSource.getRepository(Payment),
    RequestModel: AppDataSource.getRepository(Request),
    RoomModel: AppDataSource.getRepository(Room),
    UserModel: AppDataSource.getRepository(User),
    ViolationModel: AppDataSource.getRepository(Violation),
    RoomDeviceModel: AppDataSource.getRepository(RoomDevice),
    MaintenanceRequestModel: AppDataSource.getRepository(MaintenanceRequest),
    BillModel: AppDataSource.getRepository(Bill),
}