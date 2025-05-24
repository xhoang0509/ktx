const { Like } = require("typeorm");
const { ContractModel, RoomModel } = require("../models/db");
const ContractService = require("../services/contract.service");

const ContractController = {
    async create(req, res) {
        try {
            const userId = req.user?.sub;

            const response = await ContractService.create(userId, req.body);
            res.status(200).send({ status: 200, message: 'Tạo hợp đồng thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async list(req, res) {
        try {
            const userId = req.user?.sub;
            const contracts = await ContractService.list(userId, req.body);
            return res.status(200).json({ status: 200, message: "Lấy danh sách hợp đồng thành công", data: contracts });
        } catch (error) {
            return res.status(400).json({ status: 200, message: error.message });
        }
    },


    async listAdmin(req, res) {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const skip = (page - 1) * limit;
            const filter = search ? [
                { student_id: Like(`%${search}%`) },
                { room_id: Like(`%${search}%`) },
                { user_id: Like(`%${search}%`) },
            ] : {};

            const contracts = await ContractModel.find({
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
    },



    async view(req, res) {
        try {
            const userId = req.user?.sub;
            const contract = await ContractService.view(userId, req.body);
            return res.status(200).json({ message: "Xem hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async adminGetContractDetail(req, res) {
        try {
            const { id: contractId } = req.params;
            const contract = await ContractModel.findOne({
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
    },

    async cancel(req, res) {
        try {
            const userId = req.user?.sub;
            const { id: contractId } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: contractId, user: { id: userId } },
            });

            if (!contract) {
                throw new Error("Hợp đồng không tồn tại");
            }

            await ContractModel.update({
                id: contractId
            }, { status: "cancelled" });

            const room = await RoomModel.findOne({
                where: { id: contract.room_id },
                relations: ["users"]
            });

            if (room) {
                room.current_capacity -= 1;
                room.users = room.users.filter((u) => u.id !== userId);
                await RoomModel.save(room);
            }


            const newContract = await ContractModel.findOne({
                where: { id: contractId, user: { id: userId } },
            });

            return res.status(200).json({ status: 200, message: "Hủy hợp đồng thành công", data: newContract });
        } catch (error) {
            return res.status(400).json({ status: 500, message: error.message });
        }
    },

    async transferRoom(req, res) {
        try {
            const userId = req.user?.sub;
            const { newRoomId } = req.body;

            const contract = await ContractService.transferRoom(userId, newRoomId);
            return res.status(200).json({ message: "Chuyển phòng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async approveContract(req, res) {
        try {
            const { contractId, approve } = req.body;

            const contract = await ContractService.approveContract(contractId, approve);
            return res.status(200).json({ message: "Cập nhật hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async rejectContract(req, res) {
        try {
            const { contractId } = req.body;
            console.log(contractId)

            // const contract = await ContractService.approveContract(contractId, reject);
            return res.status(200).json({ message: "Cập nhật hợp đồng thành công", });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getPendingContracts(req, res) {
        try {
            const contracts = await ContractService.getPendingContracts();
            return res.status(200).json({ contracts });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },


}

module.exports = ContractController 