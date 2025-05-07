import { AppDataSource } from "../models/db";
import { CreateDeviceDto, UpdateDeviceDto } from "../models/dto/device.dto";
import { Device } from "../models/entities/device";
import { Like, Repository } from "typeorm";

export class DeviceService {
    private readonly deviceRepository: Repository<Device>

    constructor() {
        this.deviceRepository = AppDataSource.getRepository(Device);
    }

    async create(data: CreateDeviceDto): Promise<Device> {
        const device = this.deviceRepository.create(data);
        await this.deviceRepository.save(device);

        return device;
    }

    async modify(deviceId: number, data: UpdateDeviceDto): Promise<Device> {
        const device = await this.deviceRepository.findOneById(deviceId);
        if (!device) {
            throw new Error("Không tìm thấy thiết bị");
        }
    
        const updatedData = { ...device, ...data, id: deviceId };
    
        await this.deviceRepository.save(updatedData);
    
        return updatedData;
    }
    

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, devices: Device[] }> {
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

    async detail(deviceId: number): Promise<Device> {
        const device = await this.deviceRepository.findOneById(deviceId);
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        return device;
    }

    async remove(deviceId: string): Promise<any> {
        const device = await this.deviceRepository.findOneById(deviceId);
        if (!device) {
            throw 'Không tìm thấy thiết bị';
        }

        device.status = 'deleted';
        await this.deviceRepository.save(device);
        return 'Xoá thiết bị thành công';
    }
}