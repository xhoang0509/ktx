const { DeviceService } = require("../services/deviceService");

class DeviceController {
    constructor() {
        this.deviceService = new DeviceService();
    }

    async create(req, res) {
        try {
            const response = await this.deviceService.create(req.body);
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.modify(Number(deviceId), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const response = await this.deviceService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.detail(Number(deviceId));
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.remove(deviceId);
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}

module.exports = { DeviceController }; 