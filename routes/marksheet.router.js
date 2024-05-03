const express = require("express");
const marksheetController  = require("../controllers/marksheet.controller.js");

const marksheetRouter = express.Router();

// create marksheet
marksheetRouter.post("/", marksheetController.createMarksheetController);

// update marksheet
marksheetRouter.patch("/", marksheetController.updateMarksheetController);

// delete marksheet
marksheetRouter.delete("/:marksheetID", marksheetController.deleteMarksheetController);

// get all marksheet
marksheetRouter.get("/all", marksheetController.getAllMarksheetController);

// get a marksheet
marksheetRouter.get("/:marksheetID", marksheetController.getMarksheetController);

// get marksheets by class
marksheetRouter.get("/class/:classID",marksheetController.getMarksheetOfClassController);


module.exports = marksheetRouter;