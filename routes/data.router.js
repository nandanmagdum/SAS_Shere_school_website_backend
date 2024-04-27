const express = require("express");
const { getAllAdminController } = require("../controllers/data.controller");

const dataRouter = express.Router();

dataRouter.get("/admins", getAllAdminController);

module.exports = dataRouter;