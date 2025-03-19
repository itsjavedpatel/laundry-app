const jwt = require("jsonwebtoken");
const BlacklistTokenModel = require("../models/BlacklistedToken");
const University = require("../models/University");
module.exports.authUniversity = async (req, res, next) => {
  try {
    // fetch token if any
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // if token is not available
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    //  token is available-- check if it is not blacklisted
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // token is available as well as not blacklisted
    //? decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    // find the user using token into db
    const university = await University.findById(decodedToken._id);
    res.user = university;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
