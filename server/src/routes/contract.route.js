const { Router } = require("express");
const { authMiddleware } = require("../middleware/userMiddleware");
const { ContractController } = require("../controller/contract.controller");

const router = Router();
const contractController = new ContractController();

router.post("/", authMiddleware, contractController.create.bind(contractController));
router.get("/list", authMiddleware, contractController.list.bind(contractController));
router.get("/list-admin", contractController.listAdmin.bind(contractController));
router.get("/view", authMiddleware, contractController.view.bind(contractController));
router.post("/:id/cancel", authMiddleware, contractController.cancel.bind(contractController));
router.post("/transfer-room", contractController.transferRoom.bind(contractController));
router.get("/pending", contractController.getPendingContracts.bind(contractController));
router.post("/approve", contractController.approveContract.bind(contractController));

module.exports = router; 