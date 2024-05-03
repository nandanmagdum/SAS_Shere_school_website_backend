const mongoose = require("mongoose");

const marksheetSchema = new mongoose.Schema({
    roll_no: {type: Number, required: true}, // req
    student_name: {type: String, required: true}, // req
    class: {type: Number, required: true}, // req
    createdBy: {type: String, required: true}, // jwt
    total_marks : {type: Number, required: true}, // calculate
    obtained_marks: {type: Number, required: true}, // calculate
    percentage: {type: Number, required: true}, // calculate
    subject_names: {type: [String] , required: true}, // req
    subject_obtained_marks: {type: [Number], default: []}, //req 
    subject_total_marks : {type: [Number], default: []}, // req
}, {timestamps: true});

const marksheetModel = mongoose.model('marksheets', marksheetSchema);

module.exports = marksheetModel;