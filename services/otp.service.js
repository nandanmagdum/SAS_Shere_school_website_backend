const express = require("express");
const mongoose = require("mongoose");
const otpModel = require("../models/otp.model.js");
const bcrypt = require("bcrypt");

const generate6DigitOTP = async() => {
     const min = 100000;
     const max = 999999;
     const otp = Math.floor(Math.random() * (max - min + 1)) + min;
     return otp;
} 

module.exports = {
    generate6DigitOTP
}