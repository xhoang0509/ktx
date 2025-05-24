const { Router } = require("express");
const UserController  = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

router.post("/login", UserController.login);
router.post("/", UserController.create);
router.post("/info", UserController.info);
router.put("/modify", authMiddleware, UserController.modify);
router.put("/upload-avatar", authMiddleware, UserController.uploadAvatar);
router.put("/:id",  UserController.modify);
router.get("/", UserController.list);
router.get("/detail", authMiddleware, UserController.detail);
router.get("/:id", (req, res) => UserController.findById(req, res));
router.delete("/:id", UserController.remove);

module.exports = router; 