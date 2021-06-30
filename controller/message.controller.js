const Message = require("./../models/message.model");

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
