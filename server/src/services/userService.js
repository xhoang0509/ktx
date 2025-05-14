const argon2 = require("argon2");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { Like } = require("typeorm");
const { AppDataSource } = require("../models/db");
const { User } = require("../models/entities/user");
const logger = require("../logger");
dotenv.config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async create(createDto) {
        const existingUser = await this.userRepository.findOne({
            where: { username: createDto.username }
        });
        if (existingUser) {
            throw new Error('Tài khoản đã tồn tại');
        }

        const existingUserByStudentId = await this.userRepository.findOne({
            where: { student_id: createDto.student_id }
        });
        if (existingUserByStudentId) {
            throw new Error('Mã sinh viên đã tồn tại');
        }

        const hashPass = await bcrypt.hash(createDto.password, saltRounds);
        console.log({hashPass})
        const data = {
            ...createDto,
            password: hashPass,
        }
        console.log({data})
        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: {
                username: loginDto.username
            }
        });
        if (!user) {
            logger.error(__filename, 'login', `Username ${loginDto.username} không tồn tại`);
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }
        const isPasswordValid = await bcrypt.compareSync(loginDto.password, user.password);
        // if (!isPasswordValid) {
        //     logger.error(__filename, 'login', `Password ${loginDto.password} không đúng`);
        //     throw new Error('Tài khoản hoặc mật khẩu không đúng');
        // }

        if (user.status !== 'active') {
            logger.error(__filename, 'login', `Tài khoản ${user.username} đã bị khóa`);
            throw new Error('Tài khoản phải được mở khoá để có thể đăng nhập');
        }

        const payload = {
            userId: user.id,
            username: user.username,
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
        return {
            token: token,
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            phone: user.phone,
            student_id: user.student_id,
        };
    }

    async modify(userId, updateDto) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
        }

        await this.userRepository.update(userId, updateDto);
        const editUser = await this.userRepository.findOneById(userId);
        if (editUser) {
            await this.userRepository.save(editUser);
        } else {
            throw 'Không thể cập nhật tài khoản';
        }
        return editUser;
    }

    async remove(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
        }

        user.status = 'deleted';
        await this.userRepository.save(user);
        return 'Xoá tài khoản thành công';
    }

    async list(page, limit, search) {
        const skip = (page - 1) * limit;

        const filterUser = search ? [
            { full_name: Like(`%${search}%`) },
            { username: Like(`%${search}%`) },
            { phone: Like(`%${search}%`) },
            { student_id: Like(`%${search}%`) }
        ] : {};

        const [users, total] = await this.userRepository.findAndCount({
            where: filterUser,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });
        // i want to return the total number of items and pages in the response
        const totalItems = total;
        const totalPages = Math.ceil(totalItems / limit);

        return { total, totalItems, totalPages, page, limit, users };
    }

    async detail(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không thấy tài khoản';
        }

        return user;
    }

    async findById(userId) {
        return await this.userRepository.findOneById(userId);
    }
}

module.exports = { UserService }; 