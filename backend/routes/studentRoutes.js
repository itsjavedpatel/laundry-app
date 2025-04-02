const express = require("express");
const { authUser } = require("../middlewares/authentication");
const {
  studentData,
  updateProfile,
  otpForPassChange,
  changePassword,
} = require("../controllers/studentController");
const studentRouter = express.Router();

// get student data

studentRouter.get("/get-data", authUser, studentData);

studentRouter.put("/update-profile", authUser, updateProfile);

studentRouter.post("/update-password", authUser, otpForPassChange);
studentRouter.put("/update-password", authUser, changePassword);

module.exports = studentRouter;
