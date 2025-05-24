const { Router } = require("express");
const RequestController  = require("../controller/request.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

// Gửi yêu cầu (rời KTX, sửa chữa, khiếu nại, đề xuất)
router.post("/", authMiddleware, RequestController.createRequest);

// Lấy danh sách yêu cầu đang chờ xử lý
router.get("/pending", RequestController.getPendingRequests);

// Duyệt/Từ chối yêu cầu
router.put("/:id/approve", RequestController.approveRequest);
router.put("/:id/reject", RequestController.rejectRequest);

module.exports = router; 