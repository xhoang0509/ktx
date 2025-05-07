import { Request, Response } from "express";
import { UserService } from "../services/userService";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "src/middleware/userMiddleware";

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(req: Request, res: Response) {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).send({ status: 201, message: 'Tạo tài khoản thành công', data: user });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.userService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";

            const response = await this.userService.list(page, limit, search);
            res.status(200).send({ status: 201, message: 'Lấy danh sách thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.sub;
    
            const response = await this.userService.detail(userId);
            return res.status(200).send({ status: 201, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }    

    async remove(req: Request, res: Response) {
        try {
            const response = await this.userService.remove(Number(req.params.id));
            return res.status(200).send({ status: 201, message: 'Xóa tài khoản thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req: AuthRequest, res: Response) {
        try {
            console.log("User in Request:", req.user);
            const userId = req.user?.sub;
    
            const response = await this.userService.modify(userId, req.body);
            return res.status(200).send({ status: 201, message: 'Sửa thông tin thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}