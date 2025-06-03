const { RoomModel, UserModel, ContractModel, DeviceModel } = require("../models/db");
const RoomService = require("../services/room.service");
const { saveBase64Images } = require("../utils/fileUpload");

const RoomController = {
    async create(req, res) {
        try {
            const data = req.body;
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

            if (data.devices?.length && Array.isArray(data.devices)) {
                data.devices = data.devices
            } else {
                data.devices = [];
            }

            const room = RoomModel.create(data);
            await RoomModel.save(room);

            res.status(200).send({ status: 200, message: 'Tạo phòng thành công', data: room });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async modify(req, res) {
        try {
            const roomId = req.params.roomId;
            const response = await RoomService.modify(Number(roomId), req.body);

            res.status(200).send({ status: 200, message: 'Sửa phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10000;
            const search = req.query.search || "";
            const response = await RoomService.list(page, limit, search);

            res.status(200).send({ status: 200, message: 'Lấy danh sách phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async listRoomInContract(req, res) {
        try {
            let rooms = await RoomModel.find();

            rooms = await Promise.all(rooms.map(async (room) => {
                room.images = room.images.map(image => `http://localhost:${process.env.PORT}${image}`);
                if (room.devices && Array.isArray(room.devices)) {
                    const devices = []
                    for (const device of room.devices) {
                        const result = await DeviceModel.findOne({ where: { id: device.deviceId } });
                        if (result) {
                            devices.push({
                                ...device,
                                ...result,
                            });
                        }
                    }
                    room.devices = devices;
                }

                const contracts = await ContractModel.find({ where: { room: { id: room.id } } });
                if (contracts.length > 0) {
                    room.contracts = contracts;
                } else {
                    room.contracts = [];
                }

                const users = await UserModel.find({
                    where: { room: { id: room.id } },
                    select: ["id", "full_name", "phone", "gender", "student_id", "class_code", "faculty_name"]
                });
                if (users.length > 0) {
                    room.users = users;
                } else {
                    room.users = [];
                }

                return room;
            }));

            rooms = rooms.filter(room => room.contracts.length > 0);

            res.status(200).send({ status: 200, message: 'Lấy danh sách phòng thành công', data: rooms });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async detail(req, res) {
        try {
            const response = await RoomService.detail(Number(req.params.roomId));

            res.status(200).send({ status: 200, message: "Lấy thông tin phòng thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const roomId = req.params.roomId;
            const room = await RoomModel.findOne({ where: { id: roomId } });
            if (!room) {
                throw 'Không thấy phòng';
            }

            const users = await UserModel.find({ where: { room: { id: roomId } } });
            if (users.length > 0) {
                res.status(400).send({ status: 400, message: "Phòng có người ở, không thể xoá!", data: { status: false } });
            } else {
                await RoomModel.delete(roomId);
                res.status(200).send({ status: 200, message: "Xoá phòng thành công", data: { status: true } });
            }
        } catch (error) {
            let message = "Có lỗi trong quá trình xử lý";
            if (error.message.includes("Cannot delete or update a parent row: a foreign key constraint fails") && error.message.includes("contract")) {
                message = "Phòng này đã được đăng ký hợp đồng, không thể xoá!";
            } else if (error.message.includes("Cannot delete or update a parent row: a foreign key constraint fails") && error.message.includes("user")) {
                message = "Phòng có người ở, không thể xoá!";
            }
            res.status(500).send({ status: 500, message: message, error: error.message });
        }
    },

}

module.exports = RoomController