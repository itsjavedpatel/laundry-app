const express = require("express");
const { authUser } = require("../middlewares/authentication");
const { studentData } = require("../controllers/studentController");
const studentRouter = express.Router();

// get student data

studentRouter.get("/get-data", authUser, studentData);

module.exports = studentRouter;
