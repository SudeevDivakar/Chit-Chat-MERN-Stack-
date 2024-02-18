//Require Express
const express = require("express");

//Create Router
const router = express.Router();

//Import protect middleware to check if user is logged in and to get user's identity
const { protect } = require("../middleware/authMiddleware.js");

//Require Controller
const messageController = require("../controllers/messageController.js");

//Routes
router.post("/", protect, messageController.sendMessage);

router.get("/:chatId", protect, messageController.allMessages);

module.exports = router;
