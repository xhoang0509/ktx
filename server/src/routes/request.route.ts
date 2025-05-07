import { Router } from "express";
import { RequestController } from "../controller/requestController";
import { authMiddleware } from "../middleware/userMiddleware";

const router = Router();
const requestController = new RequestController();

// Gửi yêu cầu (rời KTX, sửa chữa, khiếu nại, đề xuất)
router.post("/", authMiddleware, requestController.createRequest.bind(requestController));

// Lấy danh sách yêu cầu đang chờ xử lý
router.get("/pending", requestController.getPendingRequests.bind(requestController));

// Duyệt/Từ chối yêu cầu
router.put("/:id/approve", requestController.approveRequest.bind(requestController));
router.put("/:id/reject", requestController.rejectRequest.bind(requestController));

export default router;
