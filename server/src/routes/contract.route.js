const { Router } = require("express");
const { authMiddleware } = require("../middleware/userMiddleware");
const ContractController = require("../controller/contract.controller");

const router = Router();

router.post("/", authMiddleware, ContractController.create);
router.get("/list", authMiddleware, ContractController.list);
router.get("/list-admin", ContractController.listAdmin);
router.get("/view", authMiddleware, ContractController.view);
router.post("/:id/cancel", authMiddleware, ContractController.cancel);
router.post("/transfer-room", ContractController.transferRoom);
router.get("/pending", ContractController.getPendingContracts);
// admin
router.post("/:id/approve", ContractController.approveContract);
router.post("/:id/reject", ContractController.rejectContract);
router.get("/:id", ContractController.adminGetContractDetail);
module.exports = router; 