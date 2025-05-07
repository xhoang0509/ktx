import { Request, Response } from "express";
import { DeviceService } from "../services/deviceService";

export class DeviceController {
    private readonly deviceService: DeviceService;

    constructor() {
        this.deviceService = new DeviceService();
    }

    async create(req: Request, res: Response) {
        try {
            const response = await this.deviceService.create(req.body);
            res.status(201).send({ status: 201, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.modify(Number(deviceId), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";
            const response = await this.deviceService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.detail(Number(deviceId));
            res.status(200).send({ status: 200, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const deviceId = req.params.deviceId;
            const response = await this.deviceService.remove(deviceId);
            res.status(201).send({ status: 201, message: 'Tạo thiết bị thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}