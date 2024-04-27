const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true},
    staff_id: {type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true},
}, {timestamps: true});

const subjectModel = mongoose.model("subjects", subjectSchema);

module.exports = subjectModel;