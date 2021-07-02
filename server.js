const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
import Message from "./models/message.model";
import BadRequestError from "./utils/error.util";
import errorController from "./controller/error.controller";
const app = express();

require("./middleware/passport.middleware")(passport);

// mongoose

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// CUSTOM

// routes goes here
app.use("/user", userRoute);
app.use("/messages", messageRoute);

// ERROR HANDLING GOES HERE
app.all("*", (req, res, next) => {
    next(
        new BadRequestError(
            `Can't find ${req.originalUrl} on this server!!!`,
            404
        )
    );
});

app.use(errorController);

const PORT = 8000;
mongoose
    .connect("mongodb://localhost:27017/tutorial-passport", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(async () => {
        console.log("MongoDB is connected successfully");
    })
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
