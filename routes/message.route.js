const express = require("express");
const router = express.Router();
const messageController = require("./../controller/message.controller");

router.post("/", messageController.createMessage);
router.post("/error2", messageController.createAnotherMessage);
router.post("/error3", messageController.createStillAnotherMessage);

module.exports = router;
