const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { isAdminMiddleware } = require("../middlewares/auth.middleware.js");

const adminRouter = express.Router();


// creates new staff
adminRouter.use( isAdminMiddleware);
adminRouter.post("/createStaff",authController.createStaffController);

module.exports = adminRouter;