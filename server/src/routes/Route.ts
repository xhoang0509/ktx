import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import roomRouter from "./room.route";
import deviceRouter from "./device.route";
import rdRouter from "./room-device.route";
import contractRouter from "./contract.route";
import requestRouter from "./request.route";
import paymentRouter from "./payment.route";
import notificationRouter from "./notification.route";

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

export default router;