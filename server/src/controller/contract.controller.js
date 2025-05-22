const { Like } = require("typeorm");
const { AppDataSource } = require("../models/db");
const { Contract } = require("../models/entities/contracts");
const { Room } = require("../models/entities/room");
const { User } = require("../models/entities/user");
const { ContractService } = require("../services/contractService");


const contractRepo = AppDataSource.getRepository(Contract);
const userRepo = AppDataSource.getRepository(User);
const roomRepo = AppDataSource.getRepository(Room);
class ContractController {
    constructor() {
        this.contractService = new ContractService();
    }

    async create(req, res) {
        try {
            const userId = req.user?.sub;

            const response = await this.contractService.create(userId, req.body);
            res.status(200).send({ status: 200, message: 'Tạo hợp đồng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req, res) {
        try {
            const userId = req.user?.sub;
            const contracts = await this.contractService.list(userId, req.body);
            return res.status(200).json({ status: 200, message: "Lấy danh sách hợp đồng thành công", data: contracts });
        } catch (error) {
            return res.status(400).json({ status: 200, message: error.message });
        }
    }


    async listAdmin(req, res) {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const skip = (page - 1) * limit;
            const filter = search ? [
                { student_id: Like(`%${search}%`) },
                { room_id: Like(`%${search}%`) },
                { user_id: Like(`%${search}%`) },
            ] : {};

            const contracts = await contractRepo.find({
                where: filter,
                relations: {
                    user: true,
                    room: true
                },
                take: limit,
                skip: skip,
                order: {
                    createdAt: "DESC"
                }
            });
            return res.status(200).json({ status: 200, message: "Lấy danh sách hợp đồng thành công", data: contracts });
        } catch (error) {
            return res.status(400).json({ status: 200, message: error.message });
        }
    }



    async view(req, res) {
        try {
            const userId = req.user?.sub;
            const contract = await this.contractService.view(userId, req.body);
            return res.status(200).json({ message: "Xem hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async adminGetContractDetail(req, res) {
        try {
            const { id: contractId } = req.params;
            const contract = await contractRepo.findOne({
                where: { id: contractId },
                relations: {
                    user: true,
                    room: true
                }
            });
            return res.status(200).json({ message: "Xem hợp đồng thành công", data: contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async cancel(req, res) {
        try {
            const userId = req.user?.sub;
            const { id: contractId } = req.params;
            const contract = await this.contractService.cancel({ contractId, userId });
            return res.status(200).json({ status: 200, message: "Hủy hợp đồng thành công", data: contract });
        } catch (error) {
            return res.status(400).json({ status: 500, message: error.message });
        }
    }

    async transferRoom(req, res) {
        try {
            const userId = req.user?.sub;
            const { newRoomId } = req.body;

            const contract = await this.contractService.transferRoom(userId, newRoomId);
            return res.status(200).json({ message: "Chuyển phòng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async approveContract(req, res) {
        try {
            const { contractId, approve } = req.body;

            const contract = await this.contractService.approveContract(contractId, approve);
            return res.status(200).json({ message: "Cập nhật hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async rejectContract(req, res) {
        try {
            const { contractId, approve } = req.body;

            const contract = await this.contractService.approveContract(contractId, approve);
            return res.status(200).json({ message: "Cập nhật hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getPendingContracts(req, res) {
        try {
            const contracts = await this.contractService.getPendingContracts();
            return res.status(200).json({ contracts });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


}

module.exports = { ContractController }; 