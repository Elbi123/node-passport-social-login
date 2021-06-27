const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("./../models/user.model");

exports.getUser = (req, res) => {
    return res.json({
        message: "PUBLIC BOARD",
    });
};

exports.getUserDashboard = (req, res) => {
    res.json({
        message: "USER DASHBOARD",
    });
};

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            message: "Fill up the required filled",
        });
    }
    await User.findOne({ email }).exec((err, user) => {
        if (err) {
            return res.json({
                err,
            });
        }
        if (user) {
            return res.json({
                message: "User already existed",
            });
        }
        let newUser = new User({
            email: email,
            password: password,
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    return res.json({
                        err,
                    });
                }
                newUser.password = hash;
                newUser.save((err, user) => {
                    if (err) {
                        return res.json({
                            err,
                        });
                    }
                    return res.json({
                        message: "Registration Successfull",
                        user,
                    });
                });
            });
        });
    });
};

exports.login = (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.json({
                err,
            });
        }
        if (!user) {
            return res.json({
                message: info.message,
            });
        }
        res.json({
            user,
        });
    })(req, res);
};

exports.logout = (req, res) => {
    req.logout();
    res.json({
        message: "Logged out",
    });
};
