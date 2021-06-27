const express = require("express");
const userController = require("./../controller/user.controller");
const userMiddleware = require("./../middleware/auth.middleware");
const router = express.Router();

router.get("/login", userController.getUser);

router.get(
    "/user-dashboard",
    userMiddleware.isLoggedIn,
    userController.getUserDashboard
);

router.post("/login", userController.login);

router.post("/register", userController.createUser);

module.exports = router;
