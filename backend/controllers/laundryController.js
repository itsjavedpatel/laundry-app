const Laundry = require("../models/Laundry");
const Order = require("../models/Order");
const generatePassword = require("../utils/Mailer");
const bcrypt = require("bcryptjs/dist/bcrypt");
const otpModel = require("../models/OTP");
const BlacklistTokenModel = require("../models/BlacklistedToken");
const University = require("../models/University");

// gettting laundry data
module.export.getLaundrydata = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  try {
    let laundryData = await Laundry.findById(decodedToken._id);
    if (!laundryData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    if (laundryData.orders.length > 0) {
      laundryData = await laundryData.populate("orders");
    }
    return res.status(200).json({ laundryData });
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

// edit profile
module.exports.updateProfile = async (req, res, next) => {
  try {
    const { _id, role } = req.decodedToken;
    const { name, email, maxWash } = req.body;
    if (role !== "laundry") {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const updateLaundry = await Laundry.findOneAndUpdate(
      { _id, email },
      { name, maxWash },
      { new: true }
    );
    if (!updateLaundry) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(201)
      .json({ message: "Profile updated successfully", updateLaundry });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
};

// change password
module.exports.otpForPassChange = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    const { oldPassword, newPassword } = req.body;

    const laundry = await Laundry.findById(decodedToken._id).select(
      "+password"
    );
    if (!laundry) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const isMatch = await bcrypt.compare(oldPassword, laundry.password);
    if (!isMatch) {
      return res.status(401), json({ message: "Incorrect old password" });
    }
    const otp = Math.florr(100000 + Math.random() * 900000).toString();
    await sendOTP(laundry.email, otp);
    const newOtp = await otpModel.create({ otp, email: laundry.email });
    res.status(201), json({ message: "OTP sent to your registered email" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong !! try again later" });
  }
};

module.exports.changePassword = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
};
