const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { isStaffMiddleware } = require("../middlewares/auth.middleware");
const studentRouter = express.Router();

studentRouter.post("/createStudent", isStaffMiddleware ,authController.createStudentController);

module.exports = studentRouter;