const mongoose = require("mongoose");
const University = require("../models/University");
const Student = require("../models/Student");
const Laundry = require("../models/Laundry");
const Delivery = require("../models/Delivery");
const Admin = require("../models/Admin");
const { sendOTP, sendPassword } = require("../utils/Mailer");

const bcrypt = require("bcryptjs");

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
const otpModel = require("../models/OTP");
//!login logic

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  console.log("🟢 Data received at backend:", req.body);

  try {
    let user;

    // 🔍 Find the user based on their role
    if (role === "Student") {
      user = await Student.findOne({ email });
    } else if (role === "Admin") {
      user = await Admin.findOne({ email });
    } else if (role === "University") {
      user = await University.findOne({ email });
    } else if (role === "Laundry") {
      user = await Laundry.findOne({ email });
    } else if (role === "Delivery") {
      user = await Delivery.findOne({ email });
    } else {
      console.log("❌ Role not declared:", role);
      return res
        .status(403)
        .json({ message: "Role is not declared", data: req.body });
    }

    console.log("🟢 User found in database:", user);

    // 🔍 If user is not found, return 404 error
    if (!user) {
      console.log("❌ User not found!");
      return res
        .status(404)
        .json({ message: "User not Found!", data: req.body });
    }

    // 🛑 Check if the entered password matches the stored password (without bcrypt for now)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!password) {
      console.log("❌ Incorrect password!");
      return res
        .status(400)
        .json({ message: "Incorrect password!", data: req.body });
    }

    // ✅ Login Successful
    console.log("✅ Login successful for:", user.email);
    return res
      .status(200)
      .json({ message: "Login successful", data: req.body });
  } catch (error) {
    console.error("❌ Backend error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

//!Register logic
// Send OTP
exports.sendOtp = async (req, res) => {
  console.log("Incoming data :", req.body);

  const { email, universityName } = req.body;

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
      domain,
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

// Verify OTP
exports.verifyOTP = async (req, res) => {
  console.log("Incoming data in verify route :", req.body);
  const { email, otp, universityName } = req.body;
  try {
    const validOtp = await otpModel.findOne({ email, otp });
    console.log(validOtp);

    if (!validOtp) {
      // status 400 for bad request
      return res.status(400).json({ message: "Incorrect OTP entered ❌" });
    }

    const password = generatePassword();
    console.log(password);

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
// Password generator
function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}
