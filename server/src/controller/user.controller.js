const logger = require("../../logger");
const { UserService } = require("../services/userService");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require("../models/db");
const { User } = require("../models/entities/user");
class UserController {
    constructor() {
        this.userService = new UserService();
        this.userRepository = AppDataSource.getRepository(User);
    }

    async create(req, res) {
        try {
            const body = req.body
            if (!body.username || !body.password || !body.confirm_password) {
                return res.status(400).send({ status: 400, message: 'Vui lòng nhập đầy đủ thông tin' });
            }
            if (body.password !== body.confirm_password) {
                return res.status(400).send({ status: 400, message: 'Mật khẩu không khớp' });
            }
            if (body.password.length < 6 || body.password.length > 32) {
                return res.status(400).send({ status: 400, message: 'Mật khẩu phải có từ 6 đến 32 ký tự' });
            }
            if (body.full_name.length < 6 || body.full_name.length > 32) {
                return res.status(400).send({ status: 400, message: 'Tên phải có từ 6 đến 32 ký tự' });
            }
            if (body.student_id.length < 6 || body.student_id.length > 32) {
                return res.status(400).send({ status: 400, message: 'Mã sinh viên phải có từ 6 đến 32 ký tự' });
            }
            const hashPassword = await argon2.hash(body.password);
            const data = {
                username: body.username,
                password: hashPassword,
                full_name: body.full_name,
                phone: "",
                gender: "other",
                role: "user",
                student_id: body.student_id,
                avatar: "",
                status: "active",
            }
            const user = await this.userService.create(data);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: user });
        } catch (e) {
            logger.error(__filename, 'create', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    }

    async login(req, res) {
        try {
            const data = req.body
            const token = await this.userService.login(data);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            logger.error(__filename, 'login', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    }

    async info(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized - No token provided" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);

            if (!decoded.username) {
                return res.status(500).send({ status: 500, message: 'Username không tồn tại' });
            }
            const user = await this.userService.findById(decoded.userId);
            if (!user) {
                return res.status(500).send({ status: 500, message: 'Username không tồn tại' });

            }
            res.status(200).send({ status: 200, message: 'Get user info success', data: user });
        } catch (e) {
            logger.error(__filename, 'login', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    }

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";

            const response = await this.userService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Lấy danh sách thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý' });
        }
    }

    async detail(req, res) {
        try {
            const userId = req.user?.sub;
            console.log({ userId })
            const response = await this.userService.detail(userId);
            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;

            const response = await this.userService.detail(id);
            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const response = await this.userService.remove(Number(req.params.id));
            return res.status(200).send({ status: 200, message: 'Xóa tài khoản thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req, res) {
        try {
            const userId = req.user?.sub;

            const response = await this.userService.modify(userId, req.body);
            return res.status(200).send({ status: 200, message: 'Sửa thông tin thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}

module.exports = { UserController }; 