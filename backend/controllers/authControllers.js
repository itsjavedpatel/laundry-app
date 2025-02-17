const University = require("../models/University");
const Student = require("../models/Student");
const Laundry = require("../models/Laundry");
const Delivery = require("../models/Delivery");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

//login logic
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Find user in the database
    let user;
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
      return res
        .status(403)
        .json({ message: "Role is not declared", data: req.body });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found!", data: req.body });
    }
    // compare password with the hasehd password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password!", data: req.body });
    }
    return res.status(200).json({ message: "login succesful", data: req.body });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
//Register logic
exports.register = async (req, res) => {
  console.log(req.body);

  const { universityName, email, zipCode } = req.body;

  try {
    const user = await University.findOne({ email });
    //  if university exist
    if (user) {
      return res.json({ message: "University already exists", data: req.body });
    }
    // if new university
    // 1.verify university mail using UGC Api
    // 2.Generate password after verifying university
    const password = generatePassword();
    const newUser = await University.create({
      name: universityName,
      email,
      zipCode,
      password,
    });
    return res.json({
      message: "University registered Succesfully",
      data: { email: newUser.email, password: newUser.password },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.json({
      message: "something went wrong!!",
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
