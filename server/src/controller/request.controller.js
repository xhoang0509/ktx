const RequestService = require("../services/request.service");

const RequestController = {

    // Gửi yêu cầu (rời KTX, sửa chữa, khiếu nại, đề xuất)
    async createRequest(req, res) {
        try {
            const userId = req.user?.sub;
            const { category, description } = req.body;

            if (!["repair", "complaint", "suggestion", "leave_dorm", "guest_visit"].includes(category)) {
                return res.status(400).json({ message: "Loại yêu cầu không hợp lệ" });
            }

            const response = await this.requestSer.createRequest(userId, category, description);
            return res.status(200).json({ message: "Gửi yêu cầu thành công", response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi xử lý yêu cầu", error: error.message });
        }
    },

    // Duyệt yêu cầu
    async approveRequest(req, res) {
        try {
            const requestId = parseInt(req.params.id);
            const request = await this.requestSer.approveRequest(requestId);
            return res.status(200).json({ message: "Phê duyệt thành công", request });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi xử lý yêu cầu", error: error.message });
        }
    },

    // Từ chối yêu cầu
    async rejectRequest(req, res) {
        try {
            const requestId = parseInt(req.params.id);
            const request = await this.requestSer.rejectRequest(requestId);
            return res.status(200).json({ message: "Từ chối yêu cầu", request });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // Lấy danh sách yêu cầu đang chờ xử lý
    async getPendingRequests(req, res) {
        try {
            const requests = await this.requestSer.getPendingRequests();
            return res.status(200).json({ requests });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = RequestController