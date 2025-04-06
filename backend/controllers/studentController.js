const Student = require("../models/Student");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { sendOTP } = require("../utils/Mailer");
const otpModel = require("../models/OTP");
const BlacklistTokenModel = require("../models/BlacklistedToken");
const University = require("../models/University");
const Order = require("../models/Order");
const Laundry = require("../models/Laundry");

module.exports.changePassword = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    const decodedToken = req.decodedToken;
    const { newPassword, otp } = req.body.passwordForm;
    const student = await Student.findById(decodedToken._id).select(
      "+password"
    );
    const email = student.email;
    // verify otp
    const checkOtp = await otpModel.findOne({ otp, email });
    if (!checkOtp) {
      return res.status(402).json({ message: "Incorrect Otp" });
    }
    const hashPass = await bcrypt.hash(newPassword, 10);
    res.clearCookie("token");
    await BlacklistTokenModel.create({ token });
    student.password = hashPass;
    await student.save();
    res.status(201).json({ message: "Password changed Successfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.otpForPassChange = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);

    const student = await Student.findById(decodedToken._id).select(
      "+password"
    );

    if (!student) {
      console.log("student is not find");
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Old Password" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTP(student.email, otp);
    const newOtp = await otpModel.create({ otp, email: student.email });
    res.status(201).json({ message: "OTP sent to your registered email" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong !! try again later" });
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { _id, role } = req.decodedToken;
    const {
      name,
      email,
      laundryId,
      studentId,
      hostel,
      mobileNo,
      university,
      roomNo,
    } = req.body;

    if (role !== "student") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { _id, email },
      { name, hostel, mobile: mobileNo, roomNo },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "User Not Found" });
    }
    updatedStudent.populate({
      path: "university",
      select: "name",
      populate: {
        path: "laundries",
        select: "name maxWash",
      },
    });
    updatedStudent.populate("orders");
    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.studentData = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    let student = await Student.findById(decodedToken._id).populate({
      path: "university",
      select: "name",
      populate: {
        path: "laundries",
        select: "name maxWash",
      },
    });
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    student.populate("orders");

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: "Unable to access profile" });
  }
};
// Requests
module.exports.sendRequest = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;

    const formData = req.body;
    console.log(formData, _id);

    const student = await Student.findById(_id);
    if (!student) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const university = await University.findById(student.university);
    const isSent = university.requests.some(
      (r) => r.receiptNumber === formData.receiptNumber
    );
    if (isSent) {
      return res.status(409).json({ message: "Request already sent" });
    }
    university.requests.push(formData);
    await university.save();
    return res.status(201).json({ message: "Request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// mark one notification as read

module.exports.markOneAsRead = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const { messageId } = req.body;
    const student = await Student.findById(_id);
    if (!student) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    student.notifications = student.notifications?.filter(
      (m) => m._id.toString() !== messageId.toString()
    );
    await student.save();
    return res.status(200).json({ message: "Marked as read", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Mark all notification as read
module.exports.markAllAsRead = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;

    const student = await Student.findByIdAndUpdate(
      _id,
      {
        $set: {
          "notifications.$[].isRead": true,
        },
      },
      { new: true }
    );
    if (!student) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    student.populate({
      path: "university",
      select: "name",
      populate: {
        path: "laundries",
        select: "name maxWash",
      },
    });
    student.populate("orders");

    return res.status(200).json({ message: "Marked All as read", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// place order
module.exports.placeOrder = async (req, res, next) => {
  try {
    const { _id, role } = req.decodedToken;
    const { laundryId, orderDetails } = req.body;
    const student = await Student.findById(_id);
    if (!student) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    // find laundry
    const laundry = await Laundry.findById(laundryId);
    const dateNow = new Date();
    const lastReset = student.lastWashReset || new Date(0);
    const maxWash = laundry.maxWash;
    const isNewMonth =
      dateNow.getFullYear() !== lastReset.getFullYear() ||
      dateNow.getMonth() !== lastReset.getMonth();
    if (isNewMonth) {
      student.washCount = 0;
      student.lastWashReset = dateNow;
    }
    // Check if student able to place order or not
    if (student.washCount >= maxWash) {
      return res
        .status(403)
        .json({ message: "You have reached your monthly wash limit." });
    }
    student.washCount += 1;
    // create order here
    const newOrder = await Order.create({
      to: laundryId,
      from: _id,
      orderDetails,
    });
    student.orders.push(newOrder._id);
    laundry.orders.push(newOrder._id);
    await student.save();
    await laundry.save();
    student.populate("orders");
    student.populate("university", "name");
    res.status(200).json({ message: "Order placed Successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
