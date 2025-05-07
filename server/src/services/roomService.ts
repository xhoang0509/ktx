import { AppDataSource } from "../models/db";
import { CreateRoomDto, UpdateRoomDto } from "../models/dto/room.dto";
import { Room } from "../models/entities/room";
import { Like, Not, Repository } from "typeorm";
import { User } from "../models/entities/user";
import { Contract } from "../models/entities/contracts";

export class RoomService {
    private readonly roomRepository: Repository<Room>
    private readonly userRepository: Repository<User>
    private contractRepo: Repository<Contract>;

    constructor() {
        this.roomRepository = AppDataSource.getRepository(Room);
        this.userRepository = AppDataSource.getRepository(User);
        this.contractRepo = AppDataSource.getRepository(Contract);
    }

    async create(data: CreateRoomDto): Promise<Room> {
        const room = this.roomRepository.create(data);
        await this.roomRepository.save(room);

        return room;
    }

    async modify(roomId: number, data: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }

        Object.assign(room, data);
        const updateRoom = await this.roomRepository.save(room);
        if (!updateRoom) {
            throw 'KHông thể cập nhập';
        }

        return updateRoom;
    }

    async detail(roomId: number): Promise<Room> {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }

        return room;
    }
    

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, rooms: Room[] }> {
        const skip = (page - 1) * limit;

        const filterRoom = search ? [
            { name: Like(`%${search}%`) }
        ] : {};

        const [rooms, total] = await this.roomRepository.findAndCount({
            where: filterRoom,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });
        return { total, page, limit, rooms };
    }

    async getRoommates(userId: number): Promise<User[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["room"],
        });
        if (!user || !user.room) {
            throw new Error("User không có phòng hoặc không tồn tại");
        }

        return this.userRepository.find({
            where: {
                room: user.room, 
                id: Not(userId),
            },
            select: ["id", "full_name", "phone"]
        })
    }

    async getRoomChangeHistory(userId: number): Promise<Contract[]> {
        const contracts = await this.contractRepo.find({
            where: { user: { id: userId } },
            relations: ["room"],
            order: { start_date: "ASC" },
        });
        if (!contracts.length) {
            throw new Error("Bạn chưa có lịch sử chuyển phòng");
        }

        return contracts.map((c) => ({
            id: c.id,
            user: c.user,
            room: c.room,
            duration: c.duration,
            status: c.status,
            start_date: c.start_date,
            end_date: c.end_date
        }));
    }
}