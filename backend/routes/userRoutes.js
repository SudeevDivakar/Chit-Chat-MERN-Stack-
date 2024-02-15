const express = require("express");

const router = express.Router();

const userController = require("../controllers/userContollers.js");

const { protect } = require("../middleware/authMiddleware.js");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/", protect, userController.getAllUsers);

module.exports = router;
