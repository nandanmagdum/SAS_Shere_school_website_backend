const { response } = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "gceksmartcampus@gmail.com",
        pass: process.env.app_pass
    }
});

const sendOTP = async(email, otp, subject) => {
    try {
        const info = await transport.sendMail({
            from: "SMAShere Team <gceksmartcampus@gmail.com>",
            to: email,
            subject: subject,
            text: otp
        }
        );
        return info.accepted.length === 1 ? "success" : "fail";
    } catch (error) {
        console.error(error.message);
        return "fail";
    }
}

module.exports = {
    sendOTP
}