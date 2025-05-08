const { AppDataSource } = require("../models/db");
const { Admin } = require("../models/entities/admin");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

class AdminService {
    constructor() {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }

    async create(createAdminDto) {
        const existingAdmin = await this.adminRepository.findOne({
            where: { username: createAdminDto.username }
        });
        if (existingAdmin) {
            throw 'Tài khoản Admin này đã tồn tại';
        }

        const hassPass = await argon2.hash(createAdminDto.password);
        const admin = this.adminRepository.create({
            ...createAdminDto,
            password: hassPass,
        });
        await this.adminRepository.save(admin);
        return admin;
    }

    async login(loginDto) {
        const admin = await this.adminRepository.findOne({
            where: { username: loginDto.username}
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
    }
}

module.exports = { AdminService }; 