import { Request, Response } from "express";
import { RoomService } from "../services/roomService";
import { AuthRequest } from "../middleware/userMiddleware";


export class RoomController {
    private readonly roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    async create(req: Request, res: Response) {
        try {
            const response = await this.roomService.create(req.body);

            res.status(201).send({ status: 201, message: 'Tạo phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const roomId = req.params.roomId;
            const response = await this.roomService.modify(Number(roomId), req.body);

            res.status(201).send({ status: 200, message: 'Sửa phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";
            const response = await this.roomService.list(page, limit, search);

            res.status(200).send({ status: 201, message: 'Lấy danh sách phòng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const response = await this.roomService.detail(Number(req.params.roomId));
    
            res.status(200).send({ status: 200, message: "Lấy thông tin phòng thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }   
    
    async getRoommates(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.sub;
            const response = await this.roomService.getRoommates(userId);

            res.status(200).send({ status: 200, message: "Lấy danh sách thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async getRoomChangeHistory(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.sub;
            const response = await this.roomService.getRoomChangeHistory(userId);

            res.status(200).send({ status: 200, message: "Lấy danh sách thành công", data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }
}