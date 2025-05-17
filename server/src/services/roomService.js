const { AppDataSource } = require("../models/db");
const { Room } = require("../models/entities/room");
const { Like, Not } = require("typeorm");
const { User } = require("../models/entities/user");
const { Contract } = require("../models/entities/contracts");
const { saveBase64Images } = require("../utils/fileUpload");
const { SEMESTERS } = require("../constants/app.const");

const semesters = [
    {
        id: 1,
        name: "Học kỳ 1"
    },

]
class RoomService {
    constructor() {
        this.roomRepository = AppDataSource.getRepository(Room);
        this.userRepository = AppDataSource.getRepository(User);
        this.contractRepo = AppDataSource.getRepository(Contract);
    }

    async create(data) {
        if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            const imagePaths = await saveBase64Images(data.images);
            data.images = imagePaths;
        } else {
            data.images = [];
        }

        const room = this.roomRepository.create(data);
        await this.roomRepository.save(room);

        return room;
    }

    async modify(roomId, data) {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }

        if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            const newBase64Images = data.images.filter(img => typeof img === 'string' && img.includes('base64'));

            const existingImages = data.images.filter(img => typeof img === 'string' && !img.includes('base64'));

            if (newBase64Images.length > 0) {
                const newImagePaths = await saveBase64Images(newBase64Images);
                data.images = [...existingImages, ...newImagePaths];
            } else {
                data.images = existingImages;
            }
        }

        Object.assign(room, data);
        const updateRoom = await this.roomRepository.save(room);
        if (!updateRoom) {
            throw 'Không thể cập nhập';
        }

        return updateRoom;
    }

    async detail(roomId) {
        let room = await this.roomRepository.findOne({
            where: { id: roomId },
        });
        if (!room) {
            throw 'Không thấy phòng';
        }

        if (!room.images) {
            room.images = [];
        }

        const students = await this.userRepository.find({
            where: { room: { id: roomId } },
            select: ["id", "full_name", "phone", "gender", "student_id", "class_code", "faculty_name"]
        });

        if (students.length > 0) {
            room.students = students;
        } else {
            room.students = [];
        }
        room.semesters = SEMESTERS;
        return room;
    }

    async list(page, limit, search) {
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

    async delete(roomId) {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }
        await this.roomRepository.delete(roomId);
    }

    async getRoommates(userId) {
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

    async getRoomChangeHistory(userId) {
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

module.exports = { RoomService }; 