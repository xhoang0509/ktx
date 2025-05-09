const { ContractService } = require("../services/contractService");

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
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async transferRoom(req, res) {
        try {
            const userId = req.user?.sub; // Lấy từ middleware auth
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