const { Router } = require("express");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const roomRouter = require("./room.route");
const deviceRouter = require("./device.route");
const rdRouter = require("./room-device.route");
const contractRouter = require("./contract.route");
const requestRouter = require("./request.route");
const paymentRouter = require("./payment.route");
const notificationRouter = require("./notification.route");

const router = Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/device", deviceRouter);
router.use("/room-device", rdRouter);
router.use("/contract", contractRouter);
router.use("/request", requestRouter);
router.use("/payment", paymentRouter);
router.use("/notification", notificationRouter);

module.exports = router; 