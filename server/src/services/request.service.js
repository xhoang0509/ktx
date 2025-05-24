const { UserModel, RequestModel, ContractModel, RoomModel } = require("../models/db");

const RequestService = {
    // Gửi yêu cầu (bao gồm rời ký túc xá, sửa chữa, khiếu nại, đề xuất)
    async createRequest(userId, category, description) {
        const user = await UserModel.findOne({ where: { id: userId }, relations: ["room"] });
        if (!user) throw new Error("Tài khoản không tồn tại");
        if (!user.room) throw new Error("Bạn chưa có phòng");

        if (!["repair", "complaint", "suggestion", "leave_dorm", "guest_visit"].includes(category)) {
            throw new Error("Loại yêu cầu không hợp lệ");
        }

        // Kiểm tra yêu cầu rời KTX đã tồn tại chưa
        if (category === "leave_dorm") {
            const existingRequest = await RequestModel.findOne({
                where: { user: { id: userId }, category: "leave_dorm", status: "pending" },
            });
            if (existingRequest) throw new Error("Bạn đã có yêu cầu rời ký túc xá đang chờ xử lý");
        }

        const request = Request.create({ user, category, description, status: "pending" });
        return await request.save();
    },

    // Duyệt yêu cầu (dùng chung cho tất cả loại yêu cầu)
    async approveRequest(requestId) {
        const request = await RequestModel.findOne({ where: { id: requestId }, relations: ["user"] });
        if (!request) throw new Error("Yêu cầu không tồn tại");

        request.status = "approved";
        await request.save();

        // Nếu là yêu cầu rời ký túc xá → Hủy hợp đồng và giảm số lượng sinh viên trong phòng
        if (request.category === "leave_dorm") {
            const contract = await ContractModel.findOne({
                where: { user: { id: request.user.id }, status: "active" },
                relations: ["room"],
            });

            if (contract) {
                contract.status = "terminated";
                await contract.save();

                const room = await RoomModel.findOne({ where: { id: contract.room.id } });
                if (room) {
                    room.current_capacity -= 1;
                    await room.save();
                }
            }
        }

        return request;
    },

    // Từ chối yêu cầu
    async rejectRequest(requestId) {
        const request = await RequestModel.findOne({ where: { id: requestId } });
        if (!request) throw new Error("Yêu cầu không tồn tại");

        request.status = "rejected";
        return await request.save();
    },

    // Lấy danh sách yêu cầu đang chờ xử lý
    async getPendingRequests() {
        return await RequestModel.find({ where: { status: "pending" }, relations: ["user"] });
    }
};

module.exports = RequestService