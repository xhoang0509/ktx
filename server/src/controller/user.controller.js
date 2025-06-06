const logger = require("../logger");
const UserService = require("../services/users.service");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/db");
const { error } = require("../logger");
const { saveBase64Images } = require("../utils/fileUpload");
require('dotenv').config();

const UserController = {

    async create(req, res) {
        try {
            const body = req.body
            if (!body.email || !body.password || !body.confirm_password) {
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
            const exitsUser = await UserModel.findOne({ where: { email: body.email } });
            if (exitsUser) {
                return res.status(400).send({ status: 400, message: 'Email đã tồn tại' });
            }

            const data = {
                email: body.email,
                password: body.password,
                full_name: body.full_name,
                phone: "",
                gender: "male",
                role: "user",
                student_id: body.student_id,
                avatar: "",
                status: "active",
                class_code: "",
                faculty_name: "",
                address: "",
                birth_date: "",
            }
            const user = await UserService.create(data);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: user });
        } catch (e) {
            logger.error(__filename, 'create', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async uploadAvatar(req, res) {
        try {
            const userId = req.user?.sub;
            const file = req.file;

            if (!file) {
                return res.status(400).send({ status: 400, message: 'Không có file được tải lên' });
            }

            if (!userId) {
                return res.status(401).send({ status: 401, message: 'Không tìm thấy thông tin người dùng' });
            }

            // Get file path
            const avatarUrl = `/uploads/avatars/${file.filename}`;

            // Update user avatar in database
            const user = await UserModel.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send({ status: 404, message: 'Không tìm thấy người dùng' });
            }

            user.avatar = avatarUrl;
            await UserModel.save(user);

            res.status(200).send({
                status: 200,
                message: 'Upload avatar thành công',
                data: { avatar: avatarUrl }
            });
        } catch (e) {
            logger.error(__filename, 'uploadAvatar', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async login(req, res) {
        try {
            const data = req.body
            const token = await UserService.login(data);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            logger.error(__filename, 'login', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async info(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized - No token provided" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);

            if (!decoded.email) {
                return res.status(500).send({ status: 500, message: 'Username không tồn tại' });
            }
            const user = await UserService.findById(decoded.userId);
            if (!user) {
                return res.status(500).send({ status: 500, message: 'Username không tồn tại' });

            }
            if (user.avatar) {
                user.avatar = `${process.env.SERVER_URL}${user.avatar}`
            }
            res.status(200).send({ status: 200, message: 'Get user info success', data: user });
        } catch (e) {
            if (e.message === "jwt expired") {
                return res.status(401).send({ status: 401, message: 'Token đã hết hạn' });
            }
            logger.error(__filename, 'login', e.message)
            res.status(500).send({ status: 500, message: e.message || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";

            const response = await UserService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Lấy danh sách thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý' });
        }
    },

    async detail(req, res) {
        try {
            const userId = req.user?.sub;
            const response = await UserService.detail(userId);
            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: response });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({ where: { id: id } });
            if (!user) {
                return res.status(404).send({ status: 404, message: 'Không tìm thấy tài khoản' });
            }
            if (user.avatar) {
                user.avatar = `${process.env.SERVER_URL}${user.avatar}`
            }

            return res.status(200).send({ status: 200, message: 'Lấy thông tin người dùng thành công', data: user });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const response = await UserService.remove(Number(req.params.id));
            return res.status(200).send({ status: 200, message: 'Xóa tài khoản thành công', data: response });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async modify(req, res) {
        try {
            const id = req?.user?.userId || req?.params?.id;
            const updateDto = req.body;
            const user = await UserModel.findOne({ where: { id: id } });
            if (!user || !id) {
                return res.status(404).send({ status: 404, message: 'Không tìm thấy tài khoản' });
            }

            if (user.avatar) {
                user.avatar = user.avatar.replace(process.env.SERVER_URL, '');
            }

            const updateData = {}

            if (updateDto.class_code) {
                updateData.class_code = updateDto.class_code
            }
            if (updateDto.faculty_name) {
                updateData.faculty_name = updateDto.faculty_name
            }
            if (updateDto.full_name) {
                updateData.full_name = updateDto.full_name
            }
            if (updateDto.phone) {
                updateData.phone = updateDto.phone
            }

            if (updateDto.birth_date) {
                updateData.birth_date = updateDto.birth_date
            }
            if (updateDto.address) {
                updateData.address = updateDto.address
            }

            if (updateDto.gender) {
                updateData.gender = updateDto.gender
            }

            if (updateDto.avatar) {
                if (typeof updateDto.avatar === 'string' && updateDto.avatar.includes('base64')) {
                    const newImagePaths = await saveBase64Images([updateDto.avatar], "users");
                    updateData.avatar = newImagePaths[0];
                }
            }

            if (!updateData.avatar) {
                updateData.avatar = "";
            }
            
            if (updateDto.status) {
                updateData.status = updateDto.status
            }

            if (updateDto.birth_date) {
                updateData.birth_date = updateDto.birth_date
            }

            await UserModel.update({ id: id }, updateData);
            const editUser = await UserModel.findOne({ where: { id: id } });
            if (editUser.avatar) {
                editUser.avatar = `${process.env.SERVER_URL}${editUser.avatar}`
            }
            return res.status(200).send({ status: 200, message: 'Sửa thông tin thành công', data: editUser });
        } catch (e) {
            error(__filename, e.message)
            return res.status(500).send({ status: 500, message: e.message || e || 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    }
}

module.exports = UserController