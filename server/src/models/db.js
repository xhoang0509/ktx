require("reflect-metadata");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
const { Admin } = require("./entities/admin");
const { Contract } = require("./entities/contract");
const { Device } = require("./entities/device");
const { User } = require("./entities/user");
const { Room } = require("./entities/room");
const { Bill } = require("./entities/bill");
const { BillUser } = require("./entities/billUser");

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
        Room,
        User,
        Bill,
        BillUser
    ],
    migrations: ["./migrations/*.js"],
    subscribers: [],
});


module.exports = {
    AppDataSource,
    AdminModel: AppDataSource.getRepository(Admin),
    ContractModel: AppDataSource.getRepository(Contract),
    DeviceModel: AppDataSource.getRepository(Device),
    RoomModel: AppDataSource.getRepository(Room),
    UserModel: AppDataSource.getRepository(User),
    BillModel: AppDataSource.getRepository(Bill),
    BillUserModel: AppDataSource.getRepository(BillUser),
}