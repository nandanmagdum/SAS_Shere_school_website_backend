const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    roll_no: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    class_id: {type: String, required: true},
    staff_id: {type: String,  required: true}
}, {timestamps: true});

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;