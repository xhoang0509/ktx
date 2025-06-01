const { Router } = require("express");
const { PaymentController } = require("../controller/payment.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

//Admin
router.post("/admin-bill", PaymentController.addBill);
router.get("/admin-list", PaymentController.getBillList);
router.get("/admin-bill/:id", PaymentController.getBillById);
router.put("/admin-bill/:id", PaymentController.editBill);

//Sinh viên
router.post("/student-my-payments", authMiddleware, PaymentController.getStudentPayments);

router.post('/vnpay-create', PaymentController.createPaymentUrl);
router.get('/ipn-url', PaymentController.getCodeIpnUrl);

module.exports = router; 