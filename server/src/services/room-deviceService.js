const { Like } = require("typeorm");
const { RoomDevice } = require("../models/entities/room-devices");
const { AppDataSource } = require("../models/db");
const { Room } = require("../models/entities/room");
const { Device } = require("../models/entities/device");

class RoomDeviceService {
    constructor() {
        this.rdRepository = AppDataSource.getRepository(RoomDevice);
        this.roomRepository = AppDataSource.getRepository(Room);
        this.deviceRepository = AppDataSource.getRepository(Device);
    }

    async create(data) {
        const room = await this.roomRepository.findOne({ where: { id: data.roomId } });
        const device = await this.deviceRepository.findOne({ where: { id: data.deviceId } });
        if (!room || !device) {
            throw new Error('Room or Device not found');
        }

        const roomDevice = await this.rdRepository.create({
            room,
            device,
            quantity: data.quantity,
            condition: data.condition,
        });
        await this.rdRepository.save(roomDevice);

        return roomDevice;
    }

    async modify(id, data) {
        const rd = await this.rdRepository.findOneById(id);
        if (!rd) {
            throw 'Không thấy';
        }

        const updateData = {
            ...rd,
            ...data,
            id: id,
        };
        await this.rdRepository.save(updateData);

        return updateData;
    }

    async list(page, limit, search) {
        const skip = (page - 1) * limit;
    
        const [rds, total] = await this.rdRepository.findAndCount({
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
    }
    
    async detail(id) {
        const rd = await this.rdRepository.findOne({
            where: { id },
            relations: ['room', 'device']
        });
        if (!rd) {
            throw 'Không thấy';
        }

        return rd;
    }

    async remove(id) {
        const rd = await this.rdRepository.findOneById(id);
        if (!rd) {
            throw 'Không thấy';
        }
        await this.rdRepository.delete(id);

        return 'Xoá thành công';
    }
}

module.exports = { RoomDeviceService }; 