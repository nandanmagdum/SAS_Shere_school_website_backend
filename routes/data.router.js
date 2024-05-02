const express = require("express");
const dataController = require("../controllers/data.controller");

const dataRouter = express.Router();

dataRouter.get("/admins", dataController.getAllAdminController);

dataRouter.get("/staffs", dataController.getAllStaffsController);

dataRouter.get("/students", dataController.getAllStudents);

dataRouter.get("/students/:classID", dataController.getStudentsByClass);

module.exports = dataRouter;