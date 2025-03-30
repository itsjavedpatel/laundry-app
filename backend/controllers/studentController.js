const Student = require("../models/Student");

exports.studentData = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    let student = await Student.findById(decodedToken._id).populate(
      "university",
      "name"
    );
    if (!student) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    if (student.orders.length > 0) {
      await student.populate("orders");
    }
    return res.status(201).json({ student });
  } catch (error) {
    return res.status(201).json({ message: "Unable to access profile" });
  }
};
