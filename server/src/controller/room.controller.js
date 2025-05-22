const { RoomService } = require("../services/roomService");

class RoomController {
    constructor() {
        this.roomService = new RoomService();
    }

    async create(req, res) {
        try {
            const response = await this.roomService.create(req.body);

            res.status(200).send({ status: 200, message: 'Tạo phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req, res) {
        try {
            const roomId = req.params.roomId;
            const response = await this.roomService.modify(Number(roomId), req.body);

            res.status(200).send({ status: 200, message: 'Sửa phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const response = await this.roomService.list(page, limit, search);

            res.status(200).send({ status: 200, message: 'Lấy danh sách phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req, res) {
        try {
            const response = await this.roomService.detail(Number(req.params.roomId));

            res.status(200).send({ status: 200, message: "Lấy thông tin phòng thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const roomId = req.params.roomId;
            const response = await this.roomService.delete(Number(roomId));
            res.status(200).send({ status: 200, message: "Xoá phòng thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async getRoommates(req, res) {
        try {
            const userId = req.user?.sub;
            const response = await this.roomService.getRoommates(userId);

            res.status(200).send({ status: 200, message: "Lấy danh sách thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async getRoomChangeHistory(req, res) {
        try {
            const userId = req.user?.sub;
            const response = await this.roomService.getRoomChangeHistory(userId);

            res.status(200).send({ status: 200, message: "Lấy danh sách thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }
}

module.exports = { RoomController }; 