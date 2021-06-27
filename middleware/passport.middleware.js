const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./../models/user.model");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                await User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        throw err;
                    }
                    if (!user) {
                        return done(null, false, {
                            message: "Email is not registered",
                        });
                    }
                    // compare password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: "Password Incorrect",
                            });
                        }
                    });
                });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
