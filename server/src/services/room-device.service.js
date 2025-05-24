const { Like } = require("typeorm");
const { RoomModel, DeviceModel, RoomDeviceModel } = require("../models/db");

const RoomDeviceService = {

    async create(data) {
        const room = await RoomModel.findOne({ where: { id: data.roomId } });
        const device = await DeviceModel.findOne({ where: { id: data.deviceId } });
        if (!room || !device) {
            throw new Error('Room or Device not found');
        }

        const roomDevice = await RoomDeviceModel.create({
            room,
            device,
            quantity: data.quantity,
            condition: data.condition,
        });
        await RoomDeviceModel.save(roomDevice);

        return roomDevice;
    },

    async modify(id, data) {
        const rd = await RoomDeviceModel.findOneById(id);
        if (!rd) {
            throw 'Không thấy';
        }

        const updateData = {
            ...rd,
            ...data,
            id: id,
        };
        await RoomDeviceModel.save(updateData);

        return updateData;
    },

    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const [rds, total] = await RoomDeviceModel.findAndCount({
            where: search
                ? [
                    { room: { name: Like(`%${search}%`) } },
                    { device: { name: Like(`%${search}%`) } }
                ]
                : {},
            relations: ['room', 'device'],
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });

        return {
            total,
            page,
            limit,
            rds
        };
    },

    async detail(id) {
        const rd = await RoomDeviceModel.findOne({
            where: { id },
            relations: ['room', 'device']
        });
        if (!rd) {
            throw 'Không thấy';
        }

        return rd;
    },

    async remove(id) {
        const rd = await RoomDeviceModel.findOneById(id);
        if (!rd) {
            throw 'Không thấy';
        }
        await RoomDeviceModel.delete(id);

        return 'Xoá thành công';
    }
}

module.exports = RoomDeviceService