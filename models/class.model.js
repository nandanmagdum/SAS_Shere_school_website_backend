const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    class_name: {type: Number, required: true, unique : true},
    class_teacher : {type: mongoose.Schema.Types.ObjectId, ref: "staffs",required: true},
    subjects_id: {
        type: [mongoose.Schema.Types.ObjectId], ref: "subjects", default : []
    }
}, {timeseries: true});

const classModel = mongoose.model("classes", classSchema);

module.exports = classModel;