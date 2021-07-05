const LocalStrategy = require("passport-local").Strategy;
import { Strategy } from "passport-facebook";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("./../models/user.model");
import UserFB from "./../models/userfb.model";

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
    passport.use(
        new Strategy(
            {
                clientID: "",
                clientSecret: "",
                callbackURL: "/auth/facebook/callback",
                profileFields: ["id", "displayName", "photos", "email"],
                state: true,
            },
            async (accessToken, refressToken, profile, cb) => {
                console.log(profile);
                return cb(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        // if ()
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        if (ObjectId.isValid(id)) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        } else {
            UserFB.find({ id: id }, function (err, user) {
                done(err, user);
            });
        }
    });
};
