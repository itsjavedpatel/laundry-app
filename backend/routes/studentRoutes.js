const express = require("express");
const { authUser } = require("../middlewares/authentication");
const {
  studentData,
  updateProfile,
  otpForPassChange,
  changePassword,
  sendRequest,
  markOneAsRead,
  markAllAsRead,
  placeOrder,
} = require("../controllers/studentController");
const studentRouter = express.Router();

// get student data
studentRouter.get("/get-data", authUser, studentData);

// updatestudent profile
studentRouter.put("/update-profile", authUser, updateProfile);

// change student password
studentRouter.post("/update-password", authUser, otpForPassChange);
studentRouter.put("/update-password", authUser, changePassword);

// request for updating status
studentRouter.post("/request-service", authUser, sendRequest);

// Marking Notifications as read
studentRouter.put("/markoneasread", authUser, markOneAsRead);
studentRouter.put("/markallasread", authUser, markAllAsRead);

// Place order
studentRouter.post("/place-order", authUser, placeOrder);

module.exports = studentRouter;
