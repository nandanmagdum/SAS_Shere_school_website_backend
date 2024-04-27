// this file will be used for all data read opearations
const adminModel = require("../models/admin.model");

const getAllAdminController = async(req, res) => {
    try {
        const allAdmins = await adminModel.find();
        if(!allAdmins){
            return res.status(400).json("Error getting all admins");
        }
        return res.status(200).json(allAdmins);
    } catch (error) {
        console.error(error.message);
        return res.status(200).json(error.message);
    }
}
const getAllStaffController = await 

module.exports = {
    getAllAdminController
}