const mongoose = require("mongoose");

const user = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

const UserFB = mongoose.model("UserFB", user);

module.exports = UserFB;
