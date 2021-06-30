const express = require("express");
const router = express.Router();
const messageController = require("./../controller/message.controller");

router.post("/", messageController.createMessage);

module.exports = router;
