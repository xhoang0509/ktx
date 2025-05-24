const { AdminModel } = require("../models/db");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const AdminService = {
    async create(createAdminDto) {
        const existingAdmin = await AdminModel.findOne({
            where: { username: createAdminDto.username }
        });
        if (existingAdmin) {
            throw 'Tài khoản Admin này đã tồn tại';
        }

        const hassPass = await argon2.hash(createAdminDto.password);
        const admin = AdminModel.create({
            ...createAdminDto,
            password: hassPass,
        });
        await AdminModel.save(admin);
        return admin;
    },

    async login(loginDto) {
        const admin = await AdminModel.findOne({
            where: { username: loginDto.username }
        });
        if (!admin || !(await argon2.verify(admin.password, loginDto.password))) {
            throw 'Tài khoản hoặc mật khẩu không đúng';
        }

        const payload = {
            username: admin.username,
            sub: admin.id,
            role: admin.role,
        };
        if (!process.env.ADMIN_SECRET_KEY) {
            throw new Error('ADMIN_SECRET_KEY is not defined');
        }
        const token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY, { expiresIn: '1h' });

        return token;
    },

    async logout(token) {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        return decoded;
    }
}

module.exports = AdminService; 