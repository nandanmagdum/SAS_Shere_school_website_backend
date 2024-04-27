const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true},
    date: {type: Date, required: true},
    isPresent: {type: Boolean, default : false}
}, {timestamps: true});

const attendanceModel = mongoose.model("attendances", attendanceSchema);

module.exports = attendanceModel;