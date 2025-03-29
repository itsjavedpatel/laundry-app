const jwt = require("jsonwebtoken");
const BlacklistTokenModel = require("../models/BlacklistedToken");

module.exports.authUser = async (req, res, next) => {
  try {
    // fetch token if any
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // if token is not available
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    // Verify token and check blacklist in parallel
    const [isBlackListed, decodedToken] = await Promise.all([
      BlacklistTokenModel.findOne({ token }),
      jwt.verify(token, process.env.JWT_SECRET),
    ]);

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.decodedToken = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
