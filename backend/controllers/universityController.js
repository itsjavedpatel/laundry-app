const BlacklistTokenModel = require("../models/BlacklistedToken");
const Student = require("../models/Student");
const University = require("../models/University");
const jwt = require("jsonwebtoken");
const generatePassword = require("../utils/generatePassword");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { sendPassword } = require("../utils/Mailer");

// Sending university data
module.exports.getUnidata = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      console.log("token not found");
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const isBlackListed = await BlacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    let uniData = await University.findById(decodedToken._id);

    if (!uniData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    if (uniData.students.length > 0) {
      uniData = await uniData.populate("students");
    }
    if (uniData.laundries.length > 0) {
      uniData = await uniData.populate("laundries");
    }
    if (uniData.delivery.length > 0) {
      uniData = await uniData.populate("delivery");
    }
    console.log(uniData);

    return res.status(200).json({ uniData });
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized access" });
  }
};

// Adding student
module.exports.addStudent = async (req, res, next) => {
  const { username, email, laundryId, studentId, mobile } = req.body;
  const decodedToken = req.decodedToken;
  try {
    const studentExist = await Student.findOne({ email });
    if (studentExist) {
      return res.status(409).json({ message: "Student Already exists" });
    }

    const uni = await University.findById(decodedToken._id);
    if (!uni) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const password = generatePassword();
    const hashedpass = await bcrypt.hash(password, 10);
    const response = await sendPassword(username, email, password);
    if (!response) {
      return res.status(424).json({ message: "Student addition failed" });
    }
    const newStudent = await Student.create({
      name: username,
      email,
      laundryId,
      studentId,
      mobile,
      university: uni._id,
      password: hashedpass,
    });
    uni.students.push(newStudent._id);
    await uni.save();
    return res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong !! Try again later" });
  }
};
