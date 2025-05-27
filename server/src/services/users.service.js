const argon2 = require("argon2");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { Like } = require("typeorm");
const {  UserModel } = require("../models/db");
const logger = require("../logger");
const { saveBase64Images } = require("../utils/fileUpload");
dotenv.config();

const UserService = {
    async create(createDto) {
        const existingUser = await UserModel.findOne({
            where: { email: createDto.email }
        });
        if (existingUser) {
            throw new Error('Tài khoản đã tồn tại');
        }

        const existingUserByStudentId = await UserModel.findOne({
            where: { student_id: createDto.student_id }
        });
        if (existingUserByStudentId) {
            throw new Error('Mã sinh viên đã tồn tại');
        }

        const hassPass = await argon2.hash(createDto.password);

        const data = {
            ...createDto,
            password: hassPass,
            faculty_name: createDto?.faculty_name || '',
            class_code: createDto?.class_code || '',
        }
        const user = UserModel.create(data);
        await UserModel.save(user);
        return user;
    },

    async login(loginDto) {
        const user = await UserModel.findOne({
            where: {
                email: loginDto.email
            }
        });
        if (!user) {
            logger.error(__filename, 'login', `Email ${loginDto.email} không tồn tại`);
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }
        const isPasswordValid = await argon2.verify(user.password, loginDto.password);
        if (!isPasswordValid) {
            logger.error(__filename, 'login', `Password ${loginDto.password} không đúng`);
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }

        if (user.status !== 'active') {
            logger.error(__filename, 'login', `Tài khoản ${user.email} đã bị khóa`);
            throw new Error('Tài khoản phải được mở khoá để có thể đăng nhập');
        }

        const payload = {
            userId: user.id,
            email: user.email,
            sub: user.id,
            phone: user.phone,
            student_id: user.student_id,
            full_name: user.full_name,
        };
        if (!process.env.USER_SECRET_KEY) {
            throw new Error('USER_SECRET_KEY is not defined');
        }
        const token = jwt.sign(payload, process.env.USER_SECRET_KEY, {
            expiresIn: '1h'
        });
        if (user.avatar) {
            user.avatar = `${process.env.SERVER_URL}/${user.avatar}`;
        }
        return {
            token: token,
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            student_id: user.student_id,
            avatar: user.avatar,
        };
    },

    async modify(userId, updateDto) {
        const user = await UserModel.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
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
        if (updateDto.avatar) {
            if (typeof updateDto.avatar === 'string' && updateDto.avatar.includes('base64')) {
                const newImagePaths = await saveBase64Images([updateDto.avatar], "users");
                updateData.avatar = newImagePaths[0];
            }
        }

        await UserModel.update(userId, updateData);
        const editUser = await UserModel.findOneById(userId);
        if (editUser) {
            await UserModel.save(editUser);
        } else {
            throw 'Không thể cập nhật tài khoản';
        }
        return editUser;
    },


    async remove(userId) {
        const user = await UserModel.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
        }

        user.status = 'deleted';
        await UserModel.save(user);
        return 'Xoá tài khoản thành công';
    },

    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const filterUser = search ? [
            { full_name: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
            { phone: Like(`%${search}%`) },
            { student_id: Like(`%${search}%`) }
        ] : {};

        const [users, total] = await UserModel.findAndCount({
            where: filterUser,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });
        const totalItems = total;
        const totalPages = Math.ceil(totalItems / limit);

        return { total, totalItems, totalPages, page, limit, users };
    },

    async detail(userId) {
        const user = await UserModel.findOneById(userId);
        if (!user) {
            throw 'Không thấy tài khoản';
        }

        return user;
    },

    async findById(userId) {
        const user = await UserModel.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw 'Không thấy tài khoản';
        }

        return {
            ...user,
            role: 'user'
        };
    },
}

module.exports = UserService; 