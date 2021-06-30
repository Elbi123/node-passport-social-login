const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const app = express();

require("./middleware/passport.middleware")(passport);

// mongoose
mongoose
    .connect("mongodb://localhost:27017/tutorial-passport", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("MongoDB is connected successfully");
    })
    .catch((err) => console.log(err));

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

// routes goes here
app.use("/user", userRoute);
app.use("/messages", messageRoute);

// ERROR HANDLING GOES HERE
// app.use((err, req, res, next) => {
//     return res.status(500).json({ error: err.toString() });
// });

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
