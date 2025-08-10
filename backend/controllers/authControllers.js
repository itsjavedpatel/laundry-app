const mongoose = require("mongoose");
const University = require("../models/University");
const Student = require("../models/Student");
const Laundry = require("../models/Laundry");
const Delivery = require("../models/Delivery");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { sendOTP, sendPassword } = require("../utils/Mailer");
const BlacklistTokenModel = require("../models/BlacklistedToken");
const bcrypt = require("bcryptjs");
const otpModel = require("../models/OTP");
const generatePassword = require("../utils/generatePassword");

const testUniversity = {
  email: "jp754546@gmail.com",
  name: "test_university",
  domain: "gmail.com",
};
const testUniversity1 = {
  email: "axhayy69@gmail.com",
  name: "IIT Bombay",
  domain: "gmail.com",
};

//!login logic

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;

    // 🔍 Find the user based on their role
    if (role === "Student") {
      user = await Student.findOne({ email }).select("+password");
    } else if (role === "Admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "University") {
      user = await University.findOne({ email }).select("+password");
    } else if (role === "Laundry") {
      user = await Laundry.findOne({ email }).select("+password");
    } else if (role === "Delivery") {
      user = await Delivery.findOne({ email }).select("+password");
    } else {
      // console.log("❌ Role not declared:", role);
      return res
        .status(403)
        .json({ message: "Role is not declared", data: req.body });
    }

    // 🔍 If user is not found, return 404 error
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found!", data: req.body });
    }

    // 🛑 Check if the entered password matches the stored password (without bcrypt for now)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password!", data: req.body });
    }

    // ✅ Login Successful

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token);

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

//!Register logic
// Send OTP
exports.registerSendOTP = async (req, res) => {
  console.log("Incoming data :", req.body);

  const { email } = req.body;

  try {
    const db = mongoose.connection.db;

    const uniInfo = db.collection("uniInfo");

    // Check if university already exists
    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
      return res.status(409).json({
        // Conflict status (409) for already existing university
        message: "University already exists! Try logging in. 🔄",
      });
    }

    // If new university
    // 1. Verify university email by using domain name in our uniInfo collection
    if (email === testUniversity.email || email === testUniversity1.email) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const newOtp = await otpModel.create({
        email,
        otp,
      });
      console.log("OTP:", otp);
      const isSend = await sendOTP(email, otp);
      if (!isSend) {
        return res.status(406).json({
          // Not acceptable status (406) for failed OTP sending
          message: "OTP not sent. Try again later ⚠️",
        });
      }
      return res.status(201).json({
        // Created status (201) when the registration is successful
        message: "OTP Sent successfullly! 🎉",
      });
    }
    const domain = email.split("@")[1];

    const university = await uniInfo.findOne({
      domain_name: domain,
    });

    if (!university) {
      return res.status(405).json({
        // Method not allowed status (405) for invalid domain
        message: "Invalid University Email ⚠️",
      });
    }
    // 2. Verify university email by using otp verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtp = await otpModel.create({
      email,
      otp,
    });
    console.log("OTP:", otp);
    await sendOTP(email, otp);
    return res.status(201).json({
      // Created status (201) when the registration is successful
      message: "Otp Sent successfullly! 🎉",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      // Internal server error (500)
      message: "Something went wrong! Please try again later 🛑",
    });
  }
};

// Verify OTP and send password
exports.registerVerifyOTP = async (req, res) => {
  // console.log("Incoming data in verify route :", req.body);
  const { email, otp, universityName } = req.body;
  try {
    const validOtp = await otpModel.findOne({ email, otp });
    // console.log(validOtp);

    if (!validOtp) {
      // status 400 for bad request
      return res.status(400).json({ message: "Incorrect OTP entered ❌" });
    }

    const password = generatePassword();
    // console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUniversity = await University.create({
      email,
      name: universityName,
      password: hashedPassword,
    });
    if (!newUniversity) {
      return res.status(500).json({ message: "Something Went Wrong ❌" });
    }
    // send password to university email
    await sendPassword(universityName, email, password);
    res.status(201).json({ message: "University registered successfully 🎉" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ❌" });
  }
};

//! Logout user
exports.logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  try {
    res.clearCookie("token");
    await BlacklistTokenModel.create({ token });
    return res.status(200).json({ message: "🎉Logged out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "🛑 Something Went Wrong!!" });
  }
};

//! get profile
exports.getUserProfile = async (req, res, next) => {
  res.status(201).json({ message: "User profile", data: req.user });
};

//! Forgot Password

// SendOTP
exports.forgotPassSendOTP = async (req, res, next) => {
  const { email, role } = req.body;
  try {
    // First find user in database
    let user;
    if (role === "Student") {
      user = await Student.findOne({ email }).select("+password");
    } else if (role === "Admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "University") {
      user = await University.findOne({ email }).select("+password");
    } else if (role === "Laundry") {
      user = await Laundry.findOne({ email }).select("+password");
    } else if (role === "Delivery") {
      user = await Delivery.findOne({ email }).select("+password");
    } else {
      // console.log("❌ Role not declared:", role);
      return res
        .status(403)
        .json({ message: "Role is not declared", data: req.body });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", data: req.body });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtp = await otpModel.create({
      email,
      otp,
    });
    await sendOTP(email, otp);
    return res.status(201).json({
      // Created status (201) when the registration is successful
      message: "Otp Sent successfullly! 🎉",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Please try again later 🛑" });
  }
};

// Verify OTP and send password

exports.forgotPassVerifyOTP = async (req, res, next) => {
  const { email, otp, role } = req.body;
  try {
    // find otp in the OTP model
    const verifyOtp = await otpModel.findOne({ email, otp });
    if (!verifyOtp) {
      return res.status(400).json({ message: "Incorrect OTP entered ❌" });
    }
    // find user
    let user;
    if (role === "Student") {
      user = await Student.findOne({ email }).select("+password");
    } else if (role === "Admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "University") {
      user = await University.findOne({ email }).select("+password");
    } else if (role === "Laundry") {
      user = await Laundry.findOne({ email }).select("+password");
    } else if (role === "Delivery") {
      user = await Delivery.findOne({ email }).select("+password");
    }
    // generate new password
    const newPassword = generatePassword();
    // Send this password to the user
    const response = await sendPassword(user.name, email, newPassword);
    if (!response) {
      return res
        .status(500)
        .json({ message: "Something went wrong! Try again later🛑" });
    }

    // save passsword into the user by hashing it
    const hashedpass = await bcrypt.hash(newPassword, 10);
    user.password = hashedpass;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password sent to your registered email 🎉" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try again later🛑" });
  }
};
