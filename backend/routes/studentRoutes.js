const express = require("express");
const { authUser } = require("../middlewares/authentication");
const {
  studentData,
  updateProfile,
} = require("../controllers/studentController");
const studentRouter = express.Router();

// get student data

studentRouter.get("/get-data", authUser, studentData);

studentRouter.put("/update-profile", authUser, updateProfile);
module.exports = studentRouter;
