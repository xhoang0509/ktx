const { Router } = require("express");
const { PaymentController } = require("../controller/payment.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

//Admin
router.post("/admin-bill", PaymentController.addBill);
router.get("/admin-list", PaymentController.getBillList);
router.get("/admin-bill/:id", PaymentController.getBillById);
router.post("/admin-utility", PaymentController.addUtilityCost);
router.post("/admin-debts", PaymentController.getStudentDebts);
router.post("/admin-report", PaymentController.getFinancialReport);
router.get("/admin-late-payments", PaymentController.getLatePayments);

//Sinh viên
router.post("/student-my-payments", authMiddleware, PaymentController.getStudentPayments);
router.post("/student-pay", PaymentController.completePayment);
router.get("/student-history", authMiddleware, PaymentController.getPaymentHistory);

router.post('/', authMiddleware, PaymentController.createPaymentUrl);
router.get('/', authMiddleware, PaymentController.getCodeIpnUrl);

module.exports = router; 