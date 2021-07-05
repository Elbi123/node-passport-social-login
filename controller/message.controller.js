const Message = require("./../models/message.model");
import catchAsync from "./../utils/catchAsync";

exports.createMessage = async (req, res) => {
    let newMessage;
    try {
        newMessage = Message({
            text: req.body.text,
        });
        await newMessage.save();
    } catch (error) {
        return res.status(400).json({
            error: error.toString(),
        });
    }
    return res.json({
        message: newMessage,
    });
};

// 2nd - error handling method
exports.createAnotherMessage = catchAsync(async (req, res, next) => {
    const newMessage = await Message.create({
        text: req.body.text,
    });
    return res.status(201).json(newMessage);
});

exports.createStillAnotherMessage = catchAsync(async (req, res, next) => {
    const message = await Message.create({
        text: req.body.text,
    });

    res.status(201).json({
        message: "Message is added",
        body: message,
    });
});
