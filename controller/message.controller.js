const Message = require("./../models/message.model");
import catchAsync from "./../utils/catchAsync";

exports.getMessages = async (req, res) => {
    console.log(req.query);
    const messages = await Message.find({
        leg: req.query.leg,
        // duration: req.query.duration,
    });
    res.status(200).json({
        messages,
    });
};

exports.createMessage = async (req, res) => {
    let newMessage;
    try {
        newMessage = Message({
            text: req.body.text,
            leg: req.body.leg,
            duration: req.body.duration,
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
