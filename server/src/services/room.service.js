const { RoomModel, UserModel, DeviceModel } = require("../models/db");
const { Like, Not } = require("typeorm");
const { saveBase64Images } = require("../utils/fileUpload");

const RoomService = {

    async create(data) {
        const existingRoom = await RoomModel.findOne({
            where: {
                name: data.name
            }
        });
        if (existingRoom) {
            throw new Error("Tên phòng đã tồn tại! Vui lòng chọn tên khác");
        }

        if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            const imagePaths = await saveBase64Images(data.images);
            data.images = imagePaths;
        } else {
            data.images = [];
        }

        if (data.base_price) {
            data.base_price = Number(data.base_price);
        }

        const room = RoomModel.create(data);
        await RoomModel.save(room);

        return room;
    },

    async modify(roomId, data) {
        const room = await RoomModel.findOneById(roomId);
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
                const processImage = existingImages.map(img => {
                    if (img.includes(process.env.SERVER_URL)) {
                        return img.replace(process.env.SERVER_URL, '');
                    }
                    return img;
                });
                data.images = processImage;
            }
        }

        Object.assign(room, data);
        const updateRoom = await RoomModel.save(room);
        if (!updateRoom) {
            throw 'Không thể cập nhập';
        }

        return updateRoom;
    },

    async detail(roomId) {
        let room = await RoomModel.findOne({
            where: { id: roomId },
        });
        if (!room) {
            throw 'Không thấy phòng';
        }

        if (!room.images) {
            room.images = [];
        }

        const students = await UserModel.find({
            where: { room: { id: roomId } },
            select: ["id", "full_name", "phone", "gender", "student_id", "class_code", "faculty_name"]
        });

        if (students.length > 0) {
            room.students = students;
        } else {
            room.students = [];
        }
        if (room.devices && Array.isArray(room.devices)) {
           const devices = []
           for(const device of room.devices) {
            const result = await DeviceModel.findOne({ where: { id: device.deviceId } });
            if (result) {
                devices.push({
                    ...result,
                    ...device
                });
            }
           }
           room.devices = devices;
        }
        room.images = room.images.map(image => `${process.env.SERVER_URL}${image}`);
        return room;
    },

    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const filterRoom = search ? [
            { name: Like(`%${search}%`) }
        ] : {};


        let [rooms, total] = await RoomModel.findAndCount({
            where: filterRoom,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });

        rooms = rooms.map(room => {
            room.images = room.images.map(image => `http://localhost:${process.env.PORT}${image}`);
            return room;
        });
        const totalPages = Math.ceil(total / limit);
        return { totalItems: total, page, limit, totalPages, rooms };
    },

    async delete(roomId) {
        const room = await RoomModel.findOne({ where: { id: roomId } });
        if (!room) {
            throw 'Không thấy phòng';
        }
        await RoomModel.delete(roomId);
    },

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
    },

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
    },
}

module.exports = RoomService