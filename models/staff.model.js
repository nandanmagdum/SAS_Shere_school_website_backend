const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    admin_id: {type: mongoose.Schema.Types.ObjectId, ref: 'admins',requried: true}
}, {timestamps: true});

const staffModel = mongoose.model("staffs", staffSchema);

module.exports = staffModel;