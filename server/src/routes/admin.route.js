const { Router } = require("express");
const AdminController = require("../controller/admin.controller");
const adminAuthMiddleware = require("../middleware/adminMidleware");

const router = Router();

router.post("/", AdminController.create);
router.post("/login", AdminController.login);
router.post("/logout", AdminController.logout);
router.get("/analytic", AdminController.getAnalytic);
router.get("/info", adminAuthMiddleware, AdminController.getInfo);
module.exports = router; 