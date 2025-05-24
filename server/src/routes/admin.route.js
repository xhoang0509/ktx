const { Router } = require("express");
const { AdminCtroller } = require("../controller/admin.controller");

const router = Router();

router.post("/", AdminCtroller.create);
router.post("/login", AdminCtroller.login);
router.post("/logout", AdminCtroller.logout);
module.exports = router; 