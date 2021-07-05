const express = require("express");
const userController = require("./../controller/user.controller");
const userMiddleware = require("./../middleware/auth.middleware");
const router = express.Router();
import passport from "passport";

router.get("/login", userController.getUser);
// router.get('/content', userControler)

router.get(
    "/user-dashboard",
    userMiddleware.isLoggedIn,
    userController.getUserDashboard
);

// FACEBOOK AUTH
router.get("/login2/", userController.login2);
router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["public_profile", "email"],
    })
);
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/user-dashboard",
        failureRedirect: "/login2",
    })
);

router.get("/logout", userController.logout);

router.post("/login", userController.login);

router.post("/register", userController.createUser);

module.exports = router;
