import { Repository } from "typeorm";
import { Request } from "../models/entities/requests";
import { User } from "../models/entities/user";
import { Contract } from "../models/entities/contracts";
import { Room } from "../models/entities/room";
import { AppDataSource } from "../models/db";

export class RequestService {
    private readonly requestRepo: Repository<Request>;
    private readonly userRepo: Repository<User>;
    private readonly contractRepo: Repository<Contract>;
    private readonly roomRepo: Repository<Room>;

    constructor() {
        this.requestRepo = AppDataSource.getRepository(Request);
        this.userRepo = AppDataSource.getRepository(User);
        this.contractRepo = AppDataSource.getRepository(Contract);
        this.roomRepo = AppDataSource.getRepository(Room);
    }

    // Gửi yêu cầu (bao gồm rời ký túc xá, sửa chữa, khiếu nại, đề xuất)
    async createRequest(userId: number, category: string, description: string): Promise<Request> {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ["room"] });
        if (!user) throw new Error("Tài khoản không tồn tại");
        if (!user.room) throw new Error("Bạn chưa có phòng");
    
        if (!["repair", "complaint", "suggestion", "leave_dorm", "guest_visit"].includes(category)) {
            throw new Error("Loại yêu cầu không hợp lệ");
        }
    
        // Kiểm tra yêu cầu rời KTX đã tồn tại chưa
        if (category === "leave_dorm") {
            const existingRequest = await this.requestRepo.findOne({
                where: { user: { id: userId }, category: "leave_dorm", status: "pending" },
            });
            if (existingRequest) throw new Error("Bạn đã có yêu cầu rời ký túc xá đang chờ xử lý");
        }
    
        const request = this.requestRepo.create({ user, category, description, status: "pending" });
        return await this.requestRepo.save(request);
    }

    // Duyệt yêu cầu (dùng chung cho tất cả loại yêu cầu)
    async approveRequest(requestId: number): Promise<Request> {
        const request = await this.requestRepo.findOne({ where: { id: requestId }, relations: ["user"] });
        if (!request) throw new Error("Yêu cầu không tồn tại");

        request.status = "approved";
        await this.requestRepo.save(request);

        // Nếu là yêu cầu rời ký túc xá → Hủy hợp đồng và giảm số lượng sinh viên trong phòng
        if (request.category === "leave_dorm") {
            const contract = await this.contractRepo.findOne({
                where: { user: { id: request.user.id }, status: "active" },
                relations: ["room"],
            });

            if (contract) {
                contract.status = "terminated";
                await this.contractRepo.save(contract);

                const room = await this.roomRepo.findOne({ where: { id: contract.room.id } });
                if (room) {
                    room.current_capacity -= 1;
                    await this.roomRepo.save(room);
                }
            }
        }

        return request;
    }

    // Từ chối yêu cầu
    async rejectRequest(requestId: number): Promise<Request> {
        const request = await this.requestRepo.findOne({ where: { id: requestId } });
        if (!request) throw new Error("Yêu cầu không tồn tại");

        request.status = "rejected";
        return await this.requestRepo.save(request);
    }

    // Lấy danh sách yêu cầu đang chờ xử lý
    async getPendingRequests(): Promise<Request[]> {
        return await this.requestRepo.find({ where: { status: "pending" }, relations: ["user"] });
    }
}
