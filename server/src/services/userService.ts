import argon2 from "argon2";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "src/models/dto/user.dto";
import { Like } from "typeorm";
import { AppDataSource } from "../models/db";
import { User } from "../models/entities/user";

dotenv.config();

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async create(createDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { username: createDto.username }
        });
        if (existingUser) {
            throw 'Tài khoản đã tồn tại';
        }

        const hashPass = await argon2.hash(createDto.password);
        const user = this.userRepository.create({
            ...createDto,
            password: hashPass,
        });
        await this.userRepository.save(user);
        return user;
    }

    async login(loginDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                username: loginDto.username
            }
        });
        if (!user || !(await argon2.verify(loginDto.password, user.password))) {
            throw 'Tài khoản hoặc mật khẩu không đúng';
        }

        if (user.status !== 'active') {
            throw 'Tài khoản phải được mở khoá để có thể đăng nhập';
        }

        const payload = {
            username: user.username,
            sub: user.id,
            phone: user.phone,
            student_id: user.student_id,
        };
        if (!process.env.USER_SECRET_KEY) {
            throw new Error('USER_SECRET_KEY is not defined');
        }
        const token = jwt.sign(payload, process.env.USER_SECRET_KEY, {
            expiresIn: '1h'
        });
        return token;
    }

    async modify(userId: number, updateDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
        }

        await this.userRepository.update(userId, updateDto);
        const updateUser = await this.userRepository.findOneById(userId);
        if (updateUser) {
            await this.userRepository.save(updateUser);
        } else {
            throw 'Không thể cập nhật tài khoản';
        }
        return updateUser;
    }

    async remove(userId: number): Promise<any> {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không tìm thấy tài khoản';
        }

        user.status = 'deleted';
        await this.userRepository.save(user);
        return 'Xoá tài khoản thành công';
    }

    async list(page: number, limit: number, search?: string): Promise<{ total: number, totalItems: number, totalPages: number, page: number, limit: number, users: User[] }> {
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

    async detail(userId: string): Promise<User> {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw 'Không thấy tài khoản';
        }

        return user;
    }
}