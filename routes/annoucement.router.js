const express = require("express");

const announcementRouter = express.Router();

const annoucementController = require("../controllers/announcement.controller.js");

// create new announement
announcementRouter.post("/", annoucementController.createAnnoucementController);

// edit announcement
announcementRouter.patch("/", annoucementController.editAnnoucementController);

// delete annoucement
announcementRouter.delete("/:id", annoucementController.deleteAnnoucementController);

// read all annoucements
announcementRouter.get("/all", annoucementController.getAllAnnouncementController);

// read an announcement
announcementRouter.get("/:id", annoucementController.getAnnouncementController);



module.exports = announcementRouter;