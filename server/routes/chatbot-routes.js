const express = require("express");
const { chatbotHandler } = require("../controllers/chatbot-controller");

const router = express.Router();

// Chatbot API endpoint
router.post("/chat", chatbotHandler);

module.exports = router;
