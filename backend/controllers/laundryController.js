const Laundry = require("../models/Laundry");

const Order = require("../models/Order");
const bcrypt = require("bcryptjs/dist/bcrypt");
const otpModel = require("../models/OTP");
const BlacklistTokenModel = require("../models/BlacklistedToken");
const University = require("../models/University");
const { sendOTP } = require("../utils/Mailer");
const Student = require("../models/Student");
// gettting laundry data
module.exports.getLaundrydata = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  // console.log("decodedToken : ", decodedToken);
  try {
    let laundryData = await Laundry.findById(decodedToken._id);
    // console.log("laundryData : ", laundryData);
    if (!laundryData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    if (laundryData.orders.length > 0) {
      laundryData = await laundryData.populate({
        path: "orders",
        populate: { path: "from", select: "name hostel roomNo laundryId" },
      });
    }

    return res.status(200).json({ laundryData });
  } catch (error) {
    console.log("error : ", error);
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
    console.log(req.body);
    const laundry = await Laundry.findById(decodedToken._id).select(
      "+password"
    );
    console.log(laundry);
    if (!laundry) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const isMatch = await bcrypt.compare(oldPassword, laundry.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401), json({ message: "Incorrect old password" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    await sendOTP(laundry.email, otp);
    const newOtp = await otpModel.create({ otp, email: laundry.email });
    console.log(newOtp);
    res.status(201).json({ message: "OTP sent to your registered email" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong !! try again later" });
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decodedToken = req.decodedToken;
    const { newPassword, otp } = req.body.passwordForm;
    const laundry = await Laundry.findById(decodedToken._id).select(
      "+password"
    );
    const email = laundry.email;
    const checkOtp = await otpModel.findOne({ otp, email });
    if (!checkOtp) {
      return res.status(402).json({ message: "Incorrect Otp" });
    }
    const hashPass = await bcrypt.hash(newPassword, 10);
    res.clearCookie("token");
    await BlacklistTokenModel.create({ token });
    laundry.password = hashPass;
    await laundry.save();
    res.status(201).json({ message: "Password changed Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong " });
  }
};

module.exports.pickUpOrder = async (req, res) => {
  try {
    const { _id } = req.decodedToken;
    const { orderId, studentId, currStatus } = req.body;

    // Step 1: Validate laundry
    const laundry = await Laundry.findById(_id);
    if (!laundry)
      return res.status(401).json({ message: "Unauthorized Access" });

    // Step 2: Find order & student in parallel
    const [order, student] = await Promise.all([
      Order.findById(orderId),
      Student.findById(studentId),
    ]);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Step 3: Update order and notify student in parallel

    if (currStatus === "To be picked up") {
      order.orderStatus = "Washing";
      student.notifications.push({
        message: "Your order is picked up by laundry",
      });
    } else if (currStatus === "Washing") {
      order.orderStatus = "To be Delivered";
      student.notifications.push({
        message: "Your laundry is washed and will be delivered soon",
      });
    } else if (currStatus === "To be Delivered") {
      order.orderStatus = "Completed";
      student.notifications.push({
        message: "Laundry delivered Successfully",
      });
    }

    await Promise.all([order.save(), student.save()]);

    // Step 4: Populate laundry orders
    await laundry.populate({
      path: "orders",
      populate: {
        path: "from",
        select: "name hostel roomNo laundryId",
      },
    });

    return res.status(201).json({ message: "Success", laundry });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
