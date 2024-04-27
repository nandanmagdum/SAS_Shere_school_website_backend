const express = require("express");
const authController = require("../controllers/auth.controller");
const { isAdminMiddleware, auth } = require("../middlewares/auth.middleware");
const authRouter = express.Router();

authRouter.post("/createAdmin", auth ,isAdminMiddleware ,authController.createAdminController );  
authRouter.post("/loginAdmin", authController.loginAdminController);

// login staff
authRouter.post("/loginStaff", authController.loginStaffController);

// login student
authRouter.post("/loginStudent", authController.loginStudentController);

// send otp via mail
authRouter.post("/otp", authController.sendOTPController);

// verify OTP
authRouter.post("/verifyOTP", authController.verifyOTPController);

// login with OTP
authRouter.post("/loginOTP", authController.loginOTPController);

// change password
authRouter.patch("/forgot_password", authController.changePasswordController);


module.exports = authRouter;