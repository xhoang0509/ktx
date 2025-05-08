const { Contract } = require("../models/entities/contracts");
const { User } = require("../models/entities/user");
const { Room } = require("../models/entities/room");
const { AppDataSource } = require("../models/db");

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
        if (!user || !room) {
            throw new Error("User or Room not found");
        }
        if (room.current_capacity >= room.max_capacity) {
            throw new Error("Phòng đã đầy");
        }

        const contract = this.contractRepo.create({
            user,    // Gán user
            room,    // Gán room
            start_date: data.start_date,
            end_date: data.end_date,
            duration: data.duration,
            status: "pending"
        });
        await this.contractRepo.save(contract);

        room.current_capacity += 1;
        await this.roomRepo.save(room);

        return contract;
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