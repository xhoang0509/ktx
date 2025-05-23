const AdminService = require("../services/admin.service");

const AdminCtroller = {
    async create(req, res) {
        try {
            const admin = await AdminService.create(req.body);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: admin });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const token = await AdminService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            console.error(e.message);
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async logout(req, res) {
        try {
            const token = req.headers.authorization;
            // const response = await AdminService.logout(token);
            const response = {
                success: true,
            }
            res.status(200).send({ status: 200, message: 'Đăng xuất thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },
}

module.exports = { AdminCtroller }; 