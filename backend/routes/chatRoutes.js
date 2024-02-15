//Import Express
const express = require("express");

//Create a Router
const router = express.Router();

//Import protect middleware to check if user is logged in and to get user's identity
const { protect } = require("../middleware/authMiddleware.js");

//Require controller
const chatController = require("../controllers/chatController.js");

//Routes
router.post("/", protect, chatController.accessChat);

router.get("/", protect, chatController.fetchChats);

router.post("/group", protect, chatController.createGroupChat);

router.put("/group/rename", protect, chatController.renameGroup);

router.put("/group/remove", protect, chatController.removeFromGroup);

router.put("/group/add", protect, chatController.addToGroup);

module.exports = router;
