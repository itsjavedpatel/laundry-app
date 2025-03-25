const BlacklistTokenModel = require("../models/BlacklistedToken");
const University = require("../models/University");
const jwt = require("jsonwebtoken");
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

    const uniData = await University.findById(decodedToken._id);

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
    return res.status(200).json({ uniData });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
