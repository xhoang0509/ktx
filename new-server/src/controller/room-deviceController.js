const { RoomDeviceService } = require("../services/room-deviceService");

class RoomDeviceController {
    constructor() {
        this.rdService = new RoomDeviceService();
    }

    async create(req, res) {
        try {
            const response = await this.rdService.create(req.body);
            res.status(201).send({ status: 201, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req, res) {
        try {
            const id = req.params.id;
            const response = await this.rdService.modify(Number(id), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const response = await this.rdService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req, res) {
        try {
            const id = req.params.id;
            const response = await this.rdService.detail(Number(id));
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const id = req.params.id;
            const response = await this.rdService.remove(Number(id));
            res.status(200).send({ status: 200, message: 'xoá thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}

module.exports = { RoomDeviceController }; 