const express = require("express");
const authRouter = express.Router();
const { login, sendOtp, verifyOTP } = require("../controllers/authControllers");
//! login
authRouter.post("/login", login);
authRouter.post("/register/send-otp", sendOtp);
authRouter.post("/register/verify-otp", verifyOTP);
module.exports = authRouter;
