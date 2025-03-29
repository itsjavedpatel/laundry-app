const express = require("express");
const authRouter = express.Router();
const { authUniversity, authUser } = require("../middlewares/authentication");
const {
  login,
  logout,
  getUserProfile,
  registerSendOTP,
  registerVerifyOTP,
  forgotPassSendOTP,
  forgotPassVerifyOTP,
} = require("../controllers/authControllers");
//! login
authRouter.post("/login", login);

//!register
authRouter.post("/register/send-otp", registerSendOTP);
authRouter.post("/register/verify-otp", registerVerifyOTP);

//! user profile
// authRouter.get("/profile", authUniversity, getUserProfile);
//! logout
authRouter.get("/logout", logout);

//! Forget password
authRouter.post("/forgotpass/send-otp", forgotPassSendOTP);
authRouter.post("/forgotpass/verify-otp", forgotPassVerifyOTP);
module.exports = authRouter;
