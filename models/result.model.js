const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    result_year : {type: String, required: true},
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: "students",required: true},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true},
    result_date: {type: Date, default: Date.now()},
    grade: {type: String, required: true}, // a1, b2
    remark: {type: String, required: true}, // pass, fail
    subjects: {type: [String] , default: []}, 
    obtained_marks : {type: [Number] ,default: []},
    total_marks: {type: [Number] , default : []},
    attendance: {type: String, required: true},
});

const resultModel = mongoose.model("results", resultSchema);

module.exports = resultModel;