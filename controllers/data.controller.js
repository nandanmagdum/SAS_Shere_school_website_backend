// this file will be used for all data read opearations
const adminModel = require("../models/admin.model");
const staffModel = require("../models/staff.model");
const studentModel = require("../models/student.model");

const getAllAdminController = async(req, res) => {
    try {
        const allAdmins = await adminModel.find();
        if(!allAdmins){
            return res.status(400).json("Error getting all admins");
        }
        return res.status(200).json(allAdmins);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

const getAllStaffsController = async(req, res) => {
    try {
        const allStaffs = await staffModel.find();
        if(!allStaffs){
            return res.status(400).json("Error getting all staffs");
        }
        return res.status(200).json(allStaffs);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

const getAllStudents = async(req, res) => {
    try {
        const allStudents = await studentModel.find();
        if(!allStudents){
            return res.status(400).json("Error getting all students");
        }
        return res.status(200).json(allStudents);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

const getStudentsByClass = async(req, res) => {
    const classID = req.params.classID;
    try {
        const classStudents = await studentModel.find({class_id: classID});
        if(!classStudents){
            return res.status(400).json(`Error getting students from class ID ${classID}`); }
        return res.status(200).json(classStudents);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getAllAdminController,
    getAllStaffsController,
    getAllStudents,
    getStudentsByClass
}