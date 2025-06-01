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

    async logout(token) {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        return decoded;
    }
}

module.exports = AdminService; 