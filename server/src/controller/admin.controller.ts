import { Request, Response } from "express";
import { error } from "@/logger";
import { AdminService } from "@/services/adminService";

export class AdminCtroller {
    private readonly adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

    async create(req: Request, res: Response) {
        try {
            const admin = await this.adminService.create(req.body);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: admin });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        console.log('login admin');
        try {
            const token = await this.adminService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            error(__filename, e.message)
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    }
}
