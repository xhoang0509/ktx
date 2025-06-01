const { DeviceModel } = require("../models/db");
const DeviceService = require("../services/device.service");

const DeviceController = {
    async create(req, res) {
        try {
            const body = req.body;
            const result = {
                name: body.name || "",
                type: body.type || "",
                year_of_manufacture: body.year_of_manufacture || 2024,
                status: body.status || "good",
            }

            const device = DeviceModel.create(result);
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
            const limit = parseInt(req.query.limit) || 10000;
            const search = req.query.search || "";
            const response = await DeviceService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Lấy danh sách thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async listActive(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const skip = (page - 1) * limit;

            const filterDevice = search ? [
                { status: 'good' },
                { name: Like(`%${search}%`) },
            ] : { status: 'good' };

            const [devices, total] = await DeviceModel.findAndCount({
                where: filterDevice,
                take: limit,
                skip: skip,
                order: { id: "DESC" },
            });
            const data = {
                total,
                page,
                limit,
                devices
            };
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data });
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

    async show(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const device = await DeviceModel.findOne({ where: { id: deviceId } });
            if (!device) {
                throw 'Không tìm thấy thiết bị';
            }
            device.status = 'good';
            await DeviceModel.save(device);
            res.status(200).send({ status: 200, message: 'Hiện thiết bị thành công', data: device });
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
};

module.exports = DeviceController; 