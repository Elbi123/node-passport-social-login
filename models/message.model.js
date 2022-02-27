const mongoose = require("mongoose");

const message = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    leg: {
        type: Number,
    },
    duration: {
        type: Number,
    },
});

const Message = mongoose.model("Message", message);

module.exports = Message;
