const Message = require("./../models/message.model");
import BadRequestError from "./../utils/error.util";

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
exports.createAnotherMessage = async (req, res, next) => {
    const newMessage = await Message.create({
        text: req.body.text,
    }).catch((error) => next(error));
    return res.send(newMessage);
};

exports.createStillAnotherMessage = async (req, res, next) => {
    const message = await Message.create({
        text: req.body.text,
    }).catch((error) => next(new BadRequestError(error)));

    return res.send(message);
};
