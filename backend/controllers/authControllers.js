const mongoose = require("mongoose");
const University = require("../models/University");
const Student = require("../models/Student");
const Laundry = require("../models/Laundry");
const Delivery = require("../models/Delivery");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
//login logic

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
    if (password !== user.password) {
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
//Register logic
exports.register = async (req, res) => {
  console.log("Incoming data :", req.body);

  const { universityName, email, zipCode } = req.body;

  try {
    // Check if university already exists
    const db = mongoose.connection.db;

    const uniInfo = db.collection("uniInfo");
    // const updateData = await uniInfo.updateMany({}, [
    //   { $set: { uni_name: { $toLower: "$uni_name" } } },
    // ]);

    console.log(checkData);

    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
      return res.status(409).json({
        // Conflict status (409) for already existing university
        message: "University already exists. Try logging in.",
      });
    }

    // If new university
    // 1. Verify university email by using domain name in our uniInfo collection
    const domain = email.split("@")[1];

    const university = await uniInfo.findOne({
      domain,
      zip: zipCode,
    });
    if (!university) {
      return res.status(400).json({
        // Bad request status (400) for invalid email
        message: "Invalid university email or zipcode",
      });
    }
    // 2. Verify university email by using otp verification

    // 3. If otp verification is successful Generate password for the new university and hash it
    const password = generatePassword();
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashed password", hashedPassword);

    const newUniversity = await University.create({
      name: universityName,
      email,
      zipcode: zipCode,
      password,
    });
    // 4. Send the password to the university email

    return res.status(201).json({
      // Created status (201) when the registration is successful
      message: "University registered successfully!",
      data: { email: newUniversity.email, password: newUniversity.password },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      // Internal server error (500)
      message: "Something went wrong! Please try again later.",
    });
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
