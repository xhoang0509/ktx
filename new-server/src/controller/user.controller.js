const { UserService } = require("../services/userService");

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async create(req, res) {
        try {
            const user = await this.userService.create(req.body);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: user });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const token = await this.userService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
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
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req, res) {
        try {
            const userId = req.user?.sub;

            const response = await this.userService.detail(userId);
            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async findById(req, res) {
        console.log('object');
        try {
            const id = req.params.id;

            const response = await this.userService.detail(id);
            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            console.log(error);
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
            console.log("User in Request:", req.user);
            const userId = req.user?.sub;

            const response = await this.userService.modify(userId, req.body);
            return res.status(200).send({ status: 200, message: 'Sửa thông tin thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}

module.exports = { UserController }; 