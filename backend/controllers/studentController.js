const Student = require("../models/Student");

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { _id, role } = req.decodedToken;
    const { name, email, laundryId, studentId, hostel, mobileNo, university, roomNo } = req.body;

    if (role !== "student") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { _id, email },
      { name, hostel, mobile:mobileNo, roomNo },
      { new: true }
    ).populate("university","name");

    if (!updatedStudent) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "Profile Updated Successfully", updatedStudent });
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

    let student = await Student.findById(decodedToken._id).populate("university", "name");
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    if (student.orders.length > 0) {
      await student.populate("orders");
    }

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: "Unable to access profile" });
  }
};
