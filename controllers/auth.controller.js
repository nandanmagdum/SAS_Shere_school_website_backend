const adminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cokkie = require("cookie-parser");
const staffModel = require("../models/staff.model.js");
const studentModel = require("../models/student.model.js");
const otpservice = require("../services/otp.service.js");
const mailservice = require("../services/mail.service.js");
const otpModel = require("../models/otp.model.js");
const isOTPexpired = require("../services/otp_expiry.js");

dotenv.config();

const createAdminController = async (req, res) => {
    const data = req.body;
    // hash user's password
    const password = data.password;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword;
    try {
        const newAdmin = await adminModel.create(data);
        if (!newAdmin) {
            return res.status(400).json("Enter Valid data");
        }
        return res.status(200).json(newAdmin);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

const loginAdminController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {
            return res.status(404).json("Email doesn't exists !");
        }
        // compare password
        const isPassSame = await bcrypt.compare(password, admin.password);
        if (!isPassSame) {
            return res.status(400).json("Wrong password !");
        }
        // generate jwt
        const token = jwt.sign({ _id: admin._id, name: admin.name, email: admin.email, role: 'admin' }, process.env.jwt_key, { expiresIn: '30d' });
        return res.status(200).json({ "token": token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

const loginStaffController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const staff = await staffModel.findOne({ email: email });
        console.log(staff);
        if (!staff) {
            return res.status(404).json("Email doesn't exists !");
        }
        // compare password
        console.log(password, staff.password);
        const isPassSame = await bcrypt.compare(password, staff.password);
        if (!isPassSame) {
            return res.status(400).json("Wrong password !");
        }
        // generate jwt
        const token = jwt.sign({ _id: staff._id, name: staff.name, email: staff.email, role: 'staff' }, process.env.jwt_key, { expiresIn: '30d' });
        return res.status(200).json({ "token": token });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const createStaffController = async (req, res) => {
    const data = req.body;
    try {
        // hash pass
        const password = data.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;

        // add admin_id
        data.admin_id = req._id;

        const newStaff = await staffModel.create(data);
        if (!newStaff) {
            return res.status(400).json("Error createing new staff");
        }
        return res.status(200).json(newStaff);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const createStudentController = async (req, res) => {
    const data = req.body;
    try {
        // hash pass
        const password = data.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;

        // add staff_id
        data.staff_id = req._id;

        const newStudent = await studentModel.create(data);
        if (!newStudent) {
            return res.status(400).json("Error createing new staff");
        }
        return res.status(200).json(newStudent);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const loginStudentController = async (req, res) => {
    const {roll_no, password} = req.body;
    try {
        // check is student exists
        const student = await studentModel.findOne({roll_no : roll_no} );
        if(!student) {
            return res.status(404).json("Student Not Found !");
        }
        // check if password correct
        const isPassSame = await bcrypt.compare(password, student.password);
        if(!isPassSame) {
            return res.status(400).json("Wrong Password !");
        }
        // generate jwt token
        const token = await jwt.sign({
            name: student.name,
            roll_no: student.roll_no,
            _id: student._id,
            address: student.address,
            class_id: student.class_id,
            staff_id : student.staff_id,
            role: "student"             
        }, process.env.jwt_key, {'expiresIn': '30d'});
        // send in cookie and response
        return res.status(200).json({"token" : token});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

// send otp
const sendOTPController =  async(req, res) => {
    const email = req.body.email;
    const purpose = req.body.purpose;
    try {
        let otp = await otpservice.generate6DigitOTP();
        otp = otp.toString();
        const hashedOTP = await bcrypt.hash(otp, 10);
        await otpModel.deleteMany({email: email});

        await otpModel.create({
            email: email,
            otp: hashedOTP
        });
        const otpstatus = await mailservice.sendOTP(email, otp, `OTP for ${purpose}`);
        if(otpstatus === "fail"){
            return res.status(400).json("Error sending OTP, check if email is valid");
        }
        return res.status(200).json(`OTP sent to ${email}`);
    } catch (error) {
        console.error(error.message);
        console.error(error);
        return res.status(400).json(error.message);
    }
}

// verify otp
const verifyOTPController = async(req, res) => {
    const {email, otp} = req.body;
    try {
        //check if email present
        const otpdata = await otpModel.findOne({email: email});
        if(!otpdata) {
            return res.status(400).json("Please try sending otp again !");
        }
        // check if otp expired
        const otpStatus = await isOTPexpired(otpdata);
        if(otpStatus === "OTP_EXPIRED"){
            return res.status(400).json("OTP expired please try sending otp again");
        }
        // check if otp match
        const isOTPmatch = await bcrypt.compare(otp, otpdata.otp);
        if(!isOTPmatch){
            return res.status(400).json("OTP expired");
        }
        // return verified status (200)
        return res.status(200).json("OTP verified");
    } catch (error) {
        console.error(error.message);
        console.error(error);
        return res.status(400).json(error.message);
    }
}

// login with OTP for all admins and staff
const loginOTPController = async(req, res) => {
    const {email, otp, user_type} = req.body;
    try {
        //check if email present
        const otpdata = await otpModel.findOne({email: email});
        if(!otpdata) {
            return res.status(400).json("Please try sending otp again !");
        }
        // check if otp expired
        const otpStatus = await isOTPexpired(otpdata);
        if(otpStatus === "OTP_EXPIRED"){
            return res.status(400).json("OTP expired please try sending otp again");
        }
        // check if otp match
        const isOTPmatch = await bcrypt.compare(otp, otpdata.otp);
        if(!isOTPmatch){
            return res.status(400).json("OTP expired");
        }
        let user = null;
        let token = null;
        // create jwt token
        switch (user_type) {
            case "staff":
                user = await staffModel.findOne({email: email});
                if(!user){
                    return res.status(400).json("Staff email doesn't exists !");
                }
                token = await jwt.sign({"_id": user._id, email: user.email, name : user.name,admin_id: user.admin_id,"role": "staff"}, process.env.jwt_key, {expiresIn: '30d'});
                if(!token ){
                    return res.status(400).json("Error generating jwt token");
                }
                return res.status(200).json({"token": token});

            case "admin":
                user = await adminModel.findOne({email: email});
                if(!user)
                return res.status(400).json("admin doesn't exists");
                token = await jwt.sign({
                    _id: user._id,
                    email : user.email,
                    name : user.name,
                    "role": "admin"
                }, process.env.jwt_key, {expiresIn: '30d'});
                if(!token){
                    return res.status(400).json("Error generating jwt token");
                }
                return res.status(200).json({"token": token});

            default:
                return res.status(400).json("Invalid User Role");
        }

    } catch (error) {
        console.error(error.message);
        console.error(error);
        return res.status(400).json(error.message);
    }
}

// change password for admin and staff
const changePasswordController = async(req, res) => {
    const {email, new_password, user_type} = req.body;
    try {
        let user;
        if(user_type === "admin") user = await adminModel.findOne({email: email});
        else if(user_type === "staff") user = await staffModel.findOne({email: email});
        else user = await studentModel.findOne({roll_no: email});

        if(!user ) {
            return res.status(400).json(`${user_type} with credentail ${email} doesn't exists`);
        }

        // bcrypt the password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // set new password
        if(user_type === "admin") user = await adminModel.findOneAndUpdate({email: email}, {$set: {password: hashedPassword}}, {new: true});
        else if(user_type === "staff") user = await staffModel.findOneAndUpdate({email: email}, {$set: {password: hashedPassword}}, {new: true});
        else user = await studentModel.findOneAndUpdate({roll_no: email}, {$set: {password: hashedPassword}}, {new: true});

        // check if change operation is successful
        if(!user ) {
            return res.status(400).json(`Error updating password for ${email}`);
        }

        return res.status(200).json("Password changed");
    } catch (error) {
        console.error(error.message);
        console.error(error);
        return res.status(400).json(error.message);
    }
}

module.exports = {
    createAdminController,
    loginAdminController,
    createStaffController,
    loginStaffController,
    createStudentController,
    loginStudentController,
    sendOTPController,
    verifyOTPController,
    loginOTPController,
    changePasswordController
}