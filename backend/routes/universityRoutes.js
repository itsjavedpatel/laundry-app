const express = require("express");
const {
  getUnidata,
  addStudent,
  updateStudent,
  deleteStudent,
  changePassword,
  otpForPassChange,
  updateProfile,
  addLaundry,
  deleteLaundry,
  acceptRequest,
  rejectRequest,
} = require("../controllers/universityController");
const { authUser } = require("../middlewares/authentication");
const universityRouter = express.Router();

// get university data
universityRouter.get("/get-data", authUser, getUnidata);

// add student
universityRouter.post("/add-student", authUser, addStudent);

// add laundry
universityRouter.post("/add-laundry", authUser, addLaundry);

//delete laundry
universityRouter.delete("/delete-laundry/:laundryId", authUser, deleteLaundry);

// // add delivery agent
// universityRouter.post("/add-delivery",authUser,addDelivery);

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

// accept renew Request
universityRouter.put("/accept-request", authUser, acceptRequest);

// reject renew request
universityRouter.put("/reject-request", authUser, rejectRequest);
module.exports = universityRouter;
