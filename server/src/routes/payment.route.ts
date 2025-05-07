import { Router } from "express";
import { PaymentController } from "../controller/paymentController";
import { authMiddleware } from "../middleware/userMiddleware";

const router = Router();
const paymentController = new PaymentController();

//Admin
router.post("/admin-utility", paymentController.addUtilityCost.bind(paymentController));
router.post("/admin-debts", paymentController.getStudentDebts.bind(paymentController));
router.post("/admin-report", paymentController.getFinancialReport.bind(paymentController));
router.get("/admin-late-payments", paymentController.getLatePayments.bind(paymentController));

//Sinh viên
router.post("/student-my-payments", authMiddleware, paymentController.getStudentPayments.bind(paymentController));
router.post("/student-pay", paymentController.completePayment.bind(paymentController));
router.get("/student-history", authMiddleware, paymentController.getPaymentHistory.bind(paymentController));

export default router;