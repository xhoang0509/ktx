const { Router } = require("express");
const { AdminCtroller } = require("../controller/adminController");

const router = Router();
const adminController = new AdminCtroller();

router.post("/", adminController.create.bind(adminController));
router.post("/login", adminController.login.bind(adminController));

module.exports = router; 