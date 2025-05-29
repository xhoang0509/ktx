require("reflect-metadata");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
const { Admin } = require("./entities/admin");
const { Contract } = require("./entities/contracts");
const { Device } = require("./entities/device");
const { User } = require("./entities/user");
const { Room } = require("./entities/room");
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
        Room,
        User,
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
    RoomModel: AppDataSource.getRepository(Room),
    UserModel: AppDataSource.getRepository(User),
    BillModel: AppDataSource.getRepository(Bill),
}