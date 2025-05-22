const { AppDataSource } = require("../models/db");
const { Device } = require("../models/entities/device");
const { Like } = require("typeorm");

class DeviceService {
    constructor() {
        this.deviceRepository = AppDataSource.getRepository(Device);
    }

    async create(data) {
        const device = this.deviceRepository.create(data);
        await this.deviceRepository.save(device);

        return device;
    }

    async modify(deviceId, data) {
        const device = await this.deviceRepository.findOneById(deviceId);
        if (!device) {
            throw new Error("Không tìm thấy thiết bị");
        }
    
        const updatedData = { ...device, ...data, id: deviceId };
    
        await this.deviceRepository.save(updatedData);
    
        return updatedData;
    }
    
    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const filterDevice = search ? [
            { name: Like(`%${search}%`) },
        ] : {};

        const [devices, total] = await this.deviceRepository.findAndCount({
            where: filterDevice,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });
        return {
            total,
            page,
            limit,
            devices
        };
    }

    async detail(deviceId) {
        const device = await this.deviceRepository.findOneById(deviceId);
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        return device;
    }

    async remove(deviceId) {
        const device = await this.deviceRepository.findOne({ where: { id: deviceId } });
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        device.status = 'deleted';
        await this.deviceRepository.save(device);
        return 'Xoá thiết bị thành công';
    }
}

module.exports = { DeviceService }; 