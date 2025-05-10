const { Router } = require("express");
const { AdminCtroller } = require("../controller/admin.controller");

const router = Router();
const adminController = new AdminCtroller();

router.post("/", adminController.create.bind(adminController));
router.post("/login", adminController.login.bind(adminController));
router.post("/logout", adminController.logout.bind(adminController));
module.exports = router; 