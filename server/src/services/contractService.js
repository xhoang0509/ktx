const { Contract } = require("../models/entities/contracts");
const { User } = require("../models/entities/user");
const { Room } = require("../models/entities/room");
const { AppDataSource } = require("../models/db");
const { In } = require("typeorm");

class ContractService {
    constructor() {
        this.contractRepo = AppDataSource.getRepository(Contract);
        this.userRepo = AppDataSource.getRepository(User);
        this.roomRepo = AppDataSource.getRepository(Room);
    }

    async create(userId, data) {
        const user = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });

        const room = await this.roomRepo.findOne({
            where: {
                id: data.roomId
            }
        });
        if (!user) {
            throw new Error("Không tìm thấy tài khoản");
        }
        if (!room) {
            throw new Error("Không tìm thấy phòng");
        }
        
        if(user.gender !== room.gender) {
            throw new Error("Giới tính không khớp");
        }

        const contracts = await this.contractRepo.find({
            where: {
                user: {
                    id: userId
                },
                status: In(["pending", "active"])
            }
        });

        if (contracts.length > 0) {
            throw new Error("Bạn đang trong 1 hợp đồng khác, không thể tạo mới!");
        }
        if (room.current_capacity >= room.max_capacity) {
            throw new Error("Phòng đã đầy");
        }

        if (!data.startDate || !data.endDate) {
            throw new Error("Ngày bắt đầu và ngày kết thúc không được để trống");
        }

        const duration = Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24));
        const contract = this.contractRepo.create({
            user,
            room,
            start_date: data.startDate,
            end_date: data.endDate,
            duration: duration,
            status: "pending"
        });
        await this.contractRepo.save(contract);

        room.current_capacity += 1;
        await this.roomRepo.save(room);

        return contract;
    }

    async view(userId) {
        const contract = await this.contractRepo.findOne({
            where: { user: { id: userId } },
        });
        return contract;
    }

    async list(userId) {
        const contracts = await this.contractRepo.find({
            where: { user: { id: userId } },
            relations: ["room"],
            order: {
                createdAt: "DESC"
            }
        });
        return contracts;
    }

    async cancel({ contractId, userId }) {
        const contract = await this.contractRepo.findOne({
            where: { id: contractId, user: { id: userId } },
        });

        if (!contract) {
            throw new Error("Hợp đồng không tồn tại");
        }

        await this.contractRepo.update({
            id: contractId
        }, { status: "cancelled" });


        const newContract = await this.contractRepo.findOne({
            where: { id: contractId, user: { id: userId } },
        });

        return newContract;
    }
    async transferRoom(userId, newRoomId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ["room", "contracts"],
        });

        if (!user || !user.room) {
            throw new Error("User không có phòng để chuyển");
        }

        const oldRoom = user.room;
        const newRoom = await this.roomRepo.findOne({ where: { id: newRoomId } });

        if (!newRoom) {
            throw new Error("Phòng mới không tồn tại");
        }

        if (newRoom.current_capacity >= newRoom.max_capacity) {
            throw new Error("Phòng mới đã đầy");
        }

        // Tìm hợp đồng hiện tại và cập nhật trạng thái
        const currentContract = await this.contractRepo.findOne({
            where: { user: { id: userId }, status: "active" },
        });

        if (currentContract) {
            currentContract.status = "terminated";
            await this.contractRepo.save(currentContract);
        }

        // Giảm số lượng người ở phòng cũ
        oldRoom.current_capacity -= 1;
        await this.roomRepo.save(oldRoom);

        // Tạo hợp đồng mới
        const startDate = new Date();
        const duration = currentContract ? currentContract.duration : 6; // Giữ nguyên thời hạn cũ
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + duration);

        const newContract = this.contractRepo.create({
            user,
            room: newRoom,
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
            duration,
            status: "pending",
        });

        await this.contractRepo.save(newContract);

        // Tăng số lượng người ở phòng mới
        newRoom.current_capacity += 1;
        await this.roomRepo.save(newRoom);

        return newContract;
    }

    async approveContract(contractId, approve) {
        const contract = await this.contractRepo.findOne({
            where: { id: contractId },
            relations: ["room", "user"],
        });

        if (!contract) {
            throw new Error("Hợp đồng không tồn tại");
        }

        if (contract.status !== "pending") {
            throw new Error("Hợp đồng đã được xử lý trước đó");
        }

        if (approve) {
            // Phê duyệt hợp đồng
            contract.status = "active";
        } else {
            // Từ chối hợp đồng, giảm số người trong phòng
            contract.status = "terminated";
            contract.room.current_capacity -= 1;
            await this.roomRepo.save(contract.room);
        }

        await this.contractRepo.save(contract);
        return contract;
    }

    async getPendingContracts() {
        const contract = await this.contractRepo.find({
            where: { status: "pending" },
            relations: ["user", "room"],
        });

        return contract;
    }
}

module.exports = { ContractService }; 