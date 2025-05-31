const { Router } = require("express");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const roomRouter = require("./room.route");
const deviceRouter = require("./device.route");
const contractRouter = require("./contract.route");
const paymentRouter = require("./payment.route");
const analyticRouter = require("./analytic.route");
const router = Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/device", deviceRouter);
router.use("/contract", contractRouter);
router.use("/payment", paymentRouter);
router.use("/analytic", analyticRouter);

module.exports = router; 