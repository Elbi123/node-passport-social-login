import { Strategy } from "passport-facebook";

module.exports = (passport) => {
    passport.use(
        new Strategy(
            {
                clientID: "FACEBOOK-CLIENT-ID",
                clientSecret: "FACEBOOK-CLIENT-SECRET",
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
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
