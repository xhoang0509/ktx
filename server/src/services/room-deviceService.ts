import { Like, Repository } from "typeorm";
import { RoomDevice } from "../models/entities/room-devices";
import { AppDataSource } from "../models/db";
import { CreateRoomDeviceDto, UpdateRoomDeviceDto } from "../models/dto/room-device.dto";
import { Room } from "../models/entities/room";
import { Device } from "../models/entities/device";

export class RoomDeviceService {
    private rdRepository: Repository<RoomDevice>
    private roomRepository: Repository<Room>
    private deviceRepository: Repository<Device>

    constructor() {
        this.rdRepository = AppDataSource.getRepository(RoomDevice);
        this.roomRepository = AppDataSource.getRepository(Room);
        this.deviceRepository = AppDataSource.getRepository(Device);
    }

    async create(data: CreateRoomDeviceDto): Promise<RoomDevice> {
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

    async modify(id: number, data: UpdateRoomDeviceDto): Promise<RoomDevice> {
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

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, rds: RoomDevice[] }> {
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
    

    async detail(id: number): Promise<RoomDevice> {
        const rd = await this.rdRepository.findOne({
            where: { id },
            relations: ['room', 'device']
        });
        if (!rd) {
            throw 'Không thấy';
        }

        return rd;
    }

    async remove(id: number): Promise<any> {
        const rd = await this.rdRepository.findOneById(id);
        if (!rd) {
            throw 'Không thấy';
        }
        await this.rdRepository.delete(id);

        return 'Xoá thành công';
    }
}