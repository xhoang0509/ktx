const { DeviceModel } = require("../models/db");
const DeviceService = require("../services/device.service");

const DeviceController = {
    async create(req, res) {
        try {
            const device = DeviceModel.create(data);
            await DeviceModel.save(device);

            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: device });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async modify(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await DeviceService.modify(Number(deviceId), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const response = await DeviceService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async detail(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await DeviceService.detail(Number(deviceId));
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const response = await DeviceService.remove(deviceId);
            res.status(200).send({ status: 200, message: 'Xóa thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },
};

module.exports = DeviceController; 