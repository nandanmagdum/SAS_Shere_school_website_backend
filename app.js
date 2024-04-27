const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authMiddlware = require("./middlewares/auth.middleware.js");

const router = require("./routes/router.js");

dotenv.config();

const app = express();
const PORT = 8000;

// default middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dummy middleware
app.use((req, res, next) => {
    console.log(req.path);
    return next();
});

// middlewares
app.use(authMiddlware.filterAuth);

// routes
app.use("/", router);

// mongoose connection and listen for request
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Atlas connected");
    app.listen(PORT , () => {
        console.log(`Server is listening at ${PORT}`);
    });
})
.catch((err) => {
    console.error(err.message);
});