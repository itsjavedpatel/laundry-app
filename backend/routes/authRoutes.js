const express = require("express");
const authRouter = express.Router();
const { authUniversity } = require("../middlewares/authentication");
const {
  login,
  sendOtp,
  verifyOTP,
  logout,
  getUserProfile,
} = require("../controllers/authControllers");
//! login
authRouter.post("/login", login);

//!register
authRouter.post("/register/send-otp", sendOtp);
authRouter.post("/register/verify-otp", verifyOTP);

//! user profile
authRouter.get("/profile", authUniversity, getUserProfile);
//! logout
authRouter.get("/logout", authUniversity, logout);

module.exports = authRouter;
