const express = require("express");
const {
  getUnidata,
  addStudent,
  updateStudent,
  deleteStudent,
  changePassword,
  otpForPassChange,
  updateProfile,
} = require("../controllers/universityController");
const { authUser } = require("../middlewares/authentication");
const universityRouter = express.Router();

// get university data
universityRouter.get("/get-data", authUser, getUnidata);

// add student
universityRouter.post("/add-student", authUser, addStudent);

// update student status
universityRouter.put("/update-student", authUser, updateStudent);

//delete student
universityRouter.delete("/delete-student/:studentId", authUser, deleteStudent);

// update pass
// sendOtp
universityRouter.post("/update-password", authUser, otpForPassChange);
universityRouter.put("/update-password", authUser, changePassword);

// update profile
universityRouter.put("/update-profile", authUser, updateProfile);
module.exports = universityRouter;
