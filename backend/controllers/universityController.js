const Student = require("../models/Student");

const University = require("../models/University");

const generatePassword = require("../utils/generatePassword");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { sendPassword, sendOTP } = require("../utils/Mailer");
const otpModel = require("../models/OTP");
const Laundry = require("../models/Laundry");
const BlacklistTokenModel = require("../models/BlacklistedToken");

// Sending university data
module.exports.getUnidata = async (req, res, next) => {
  const decodedToken = req.decodedToken;

  try {
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
    // if (uniData.delivery.length > 0) {
    //   uniData = await uniData.populate("delivery");
    // }
    // console.log(uniData);

    return res.status(200).json({ uniData });
  } catch (error) {
    // console.log(error);

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
      return res.status(401).json({ message: "Unauthorized access" });
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
    await uni.populate("students");
    if (uni.laundries.length > 0) {
      await uni.populate("laundries");
    }
    await uni.save();
    return res.status(201).json({ message: "Student added successfully", uni });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong !! Try again later" });
  }
};

// updating student status
module.exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.body;

    const { _id } = req.decodedToken;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.status === "active"
      ? (student.status = "inactive")
      : (student.status = "active");
    await student.save();

    let uni = await University.findById(_id).populate("students");
    if (uni.laundries.length > 0) {
      uni.populate("laundries");
    }

    return res
      .status(200)
      .json({ message: "Student status updated successfully", uni });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// delete laundry

module.exports.deleteLaundry = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  console.log(decodedToken._id);
  const id = req.params.laundryId;
  console.log("id:", id);

  try {
    const laundry = await Laundry.findByIdAndDelete(id);
    const university = await University.findById(decodedToken._id);
    if (!university) {
      console.log("University not found");
    }

    university.laundries = university.laundries.filter(
      (laundry) => laundry._id.toString() !== id.toString()
    );
    await university.save();
    return res.status(200).json({ message: "Laundry deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
// change password

module.exports.otpForPassChange = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    const { oldPassword, newPassword } = req.body;

    const university = await University.findById(decodedToken._id).select(
      "+password"
    );

    if (!university) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const isMatch = await bcrypt.compare(oldPassword, university.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Old Password" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTP(university.email, otp);
    const newOtp = await otpModel.create({ otp, email: university.email });
    res.status(201).json({ message: "OTP sent to your registered email" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong !! try again later" });
  }
};
module.exports.changePassword = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decodedToken = req.decodedToken;
    const { newPassword, otp } = req.body.passwordForm;
    const university = await University.findById(decodedToken._id).select(
      "+password"
    );
    const email = university.email;
    // verify otp
    const checkOtp = await otpModel.findOne({ otp, email });
    if (!checkOtp) {
      return res.status(402).json({ message: "Incorrect Otp" });
    }
    const hashPass = await bcrypt.hash(newPassword, 10);
    res.clearCookie("token");
    await BlacklistTokenModel.create({ token });
    university.password = hashPass;
    await university.save();
    res.status(201).json({ message: "Password changed Successfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// update university profile details

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { _id, role } = req.decodedToken;
    const { email, name, UGCcode, address, zipCode } = req.body;
    if (role !== "university") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const updatedUni = await University.findOneAndUpdate(
      { _id, email },
      { UGCcode, address, zipcode: zipCode },
      { new: true }
    );

    if (!updatedUni) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res
      .status(201)
      .json({ message: "Profile Updated Successfully", updatedUni });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// Add laundry
module.exports.addLaundry = async (req, res, next) => {
  try {
    const { name, email, laundryId } = req.body;
    console.log(req.body);
    const { _id, role } = req.decodedToken;
    console.log(req.decodedToken);

    if (role !== "university") {
      return res.status(401).json({ message: "Unauthorized Acess" });
    }
    const laundryExist = await Laundry.findOne({ email });
    if (laundryExist) {
      return res.status(409).json({ message: "Laundry Already exists" });
    }
    const uni = await University.findById(_id);
    console.log(uni);
    if (!uni) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const password = generatePassword();
    const hashedpass = await bcrypt.hash(password, 10);
    const response = await sendPassword(name, email, password);
    if (!response) {
      return res.status(424).json({ message: "Laundry addition failed" });
    }
    const newLaundry = await Laundry.create({
      name,
      email,
      laundryId,
      university: uni._id,
      password: hashedpass,
    });
    uni.laundries.push(newLaundry._id);
    await uni.populate("laundries");
    if (uni.students.length > 0) {
      await uni.populate("students");
    }
    await uni.save();
    return res.status(201).json({ message: "Laundry added successfully", uni });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!! Try again later" });
  }
};

// add delivery
// module.exports.addDelivery = async (req, res, next) => {
//   try {
//     const { name, email, empId, mobile } = req.body;
//     const { _id, role } = req.decodedToken;
//     if (role !== "university") {
//       return res.status(401).json({ message: "Unauthorized Access" });
//     }
//     const deliveryExist = await deliveryId.findOne({ email });
//     if (deliveryExist) {
//       return res.status(409).json({ message: "Delivery agent already exist " });
//     }
//     const password = generatePassword();
//     const hashedpass = await bcrypt.hash(password, 10);
//     const response = await sendPassword(username, email, password);
//     if (!response) {
//       return res.status(424).json({ message: "Delivery addition failed" });
//     }

//     const newDelivery = await Delivery.create({
//       name,
//       email,
//       empId,
//       mobile,
//       university: uni._id,
//       password: hashedpass,
//     });
//     uni.delivery.push(newDelivery._id);
//     await uni.populate("delivery");
//     await uni.save();
//     return res
//       .status(201)
//       .json({ message: "Delivery added successfully", uni });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Something Went Wrong !! Try again later" });
//   }
// };

//delete student
module.exports.deleteStudent = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  console.log(decodedToken._id);
  const id = req.params.studentId;
  console.log("id :", id);
  try {
    const student = await Student.findByIdAndDelete(id);
    // const updatedUniversity = await University.updateOne(
    //   { _id: decodedToken._id },
    //   {
    //     $pull: { students: { _id: id } }, // Remove student with matching ID
    //   }
    // );
    const university = await University.findById(decodedToken._id);
    if (!university) {
      console.log("University not found");
      return;
    }

    // Filter out the student with the given ID
    university.students = university.students.filter(
      (student) => student._id.toString() !== id.toString()
    );

    // Save the updated document
    const updatedUniversity = await university.save();
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//accept student request
module.exports.acceptRequest = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const { studentId } = req.body;

    let university = await University.findById(_id)?.populate("students");
    if (!university) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const student = await Student.findOne({ university: _id, studentId });
    if (!student) {
      return res.status(404).json({ message: "Student  Not found" });
    }
    university.requests = university.requests.filter(
      (r) => r.studentId !== studentId
    );
    if (university.laundries.length > 0) {
      university.populate("laundries");
    }
    const message = "🎉 Your activation request has been accepted!";
    student.notifications.push({ message });

    await university.save();
    student.status = "active";
    await student.save();
    return res
      .status(201)
      .json({ message: "Student accepted successfully", university });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.rejectRequest = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const { studentId } = req.body;
    let university = await University.findById(_id)?.populate("students");
    if (!university) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    university.requests = university.requests.filter(
      (r) => r.studentId !== studentId
    );
    if (university.laundries.length > 0) {
      university.populate("laundries");
    }
    const student = await Student.findOne({ university: _id, studentId });
    if (!student) {
      return res.status(404).json({ message: "Student  Not found" });
    }
    const message = "❌ Your activation request has been rejected.";
    student.notifications.push({ message });
    await student.save();
    await university.save();
    return res.status(201).json({ message: "Request rejected", university });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
