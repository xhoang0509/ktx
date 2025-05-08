const { Router } = require("express");
const { authMiddleware } = require("../middleware/userMiddleware");
const { ContractController } = require("../controller/contractController");

const router = Router();
const contractController = new ContractController();

router.post("/", authMiddleware, contractController.create.bind(contractController));
router.post("/transfer-room", contractController.transferRoom.bind(contractController));
router.get("/pending", contractController.getPendingContracts.bind(contractController));
router.post("/approve", contractController.approveContract.bind(contractController));

module.exports = router; 