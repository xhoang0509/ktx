const { Router } = require("express");
const AnalyticController = require("../controller/analytic.controller");

const router = Router();

router.get("/user", AnalyticController.getUserAnalytic);
router.get("/room", AnalyticController.getRoomAnalytic);
router.get("/device", AnalyticController.getDeviceAnalytic);
router.get("/contract", AnalyticController.getContractAnalytic);
router.get("/payment", AnalyticController.getPaymentAnalytic);

module.exports = router; 