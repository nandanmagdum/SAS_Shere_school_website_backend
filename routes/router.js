const express = require("express");
const authRouter = require("./auth_router");
const adminRouter = require("./admin.router");
const studentRouter = require("./student.router");
const dataRouter = require("./data.router");
const announcementRouter = require("./annoucement.router");

const router = express.Router();

// test api
router.get("/auth/test", (req, res) => {
    return res.status(200).json("Server is live");
});

// auth routes
router.use("/announcement", announcementRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/student", studentRouter);
router.use("/data", dataRouter);

// 404 not found
router.use((req, res) => {
    return res.status(404).json("404 not found !");
});

module.exports = router;