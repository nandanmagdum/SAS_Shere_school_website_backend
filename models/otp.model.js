const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    expiry: {type: Date, default: Date.now() + (1000*60*2)},
});

const otpModel = mongoose.model('otps', otpSchema);

module.exports = otpModel;