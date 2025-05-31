const { DeviceModel } = require("../models/db");
const { Like } = require("typeorm");

const DeviceService = {
    async create(data) {
        const device = DeviceModel.create(data);
        await DeviceModel.save(device);

        return device;
    },

    async modify(deviceId, data) {
        const device = await DeviceModel.findOneById(deviceId);
        if (!device) {
            throw new Error("Không tìm thấy thiết bị");
        }

        const updatedData = { ...device, ...data, id: deviceId };

        await DeviceModel.save(updatedData);

        return updatedData;
    },

    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const filterDevice = search ? [
            { name: Like(`%${search}%`) },
        ] : {};

        const [devices, total] = await DeviceModel.findAndCount({
            where: filterDevice,
            order: { id: "DESC" },
        });
        return {
            total,
            page,
            limit,
            devices
        };
    },

    async detail(deviceId) {
        const device = await DeviceModel.findOneById(deviceId);
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        return device;
    },

    async remove(deviceId) {
        const device = await DeviceModel.findOne({ where: { id: deviceId } });
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        device.status = 'deleted';
        await DeviceModel.save(device);
        return 'Xoá thiết bị thành công';
    },
}

module.exports = DeviceService