import { Router } from "express";
import { authMiddleware } from "../middleware/userMiddleware";
import { ContractController } from "../controller/contractController";

const router = Router();
const contractController = new ContractController();

router.post("/",authMiddleware, contractController.create.bind(contractController));
router.post("/transfer-room", contractController.transferRoom.bind(contractController));
router.get("/pending", contractController.getPendingContracts.bind(contractController));
router.post("/approve", contractController.approveContract.bind(contractController));

export default router;