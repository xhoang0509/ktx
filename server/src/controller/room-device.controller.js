const RoomDeviceService = require("../services/room-device.service");

const RoomDeviceController = {

    async create(req, res) {
        try {
            const response = await RoomDeviceService.create(req.body);
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async modify(req, res) {
        try {
            const id = req.params.id;
            const response = await RoomDeviceService.modify(Number(id), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const response = await RoomDeviceService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async detail(req, res) {
        try {
            const id = req.params.id;
            const response = await RoomDeviceService.detail(Number(id));
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const id = req.params.id;
            const response = await RoomDeviceService.remove(Number(id));
            res.status(200).send({ status: 200, message: 'xoá thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}
module.exports = RoomDeviceController