const express = require("express");
const { authUser } = require("../middlewares/authentication");
const {
  changePassword,
  otpForPassChange,
  updateProfile,
  getLaundrydata,
  pickUpOrder,
} = require("../controllers/laundryController");

const laundryRouter = express.Router();

// get laundry data
laundryRouter.get("/get-data", authUser, getLaundrydata);

// updatelaundry profile
laundryRouter.put("/update-profile", authUser, updateProfile);

// change laundry password
laundryRouter.post("/update-password", authUser, otpForPassChange);
laundryRouter.put("/update-password", authUser, changePassword);

// pickup order
laundryRouter.put("/pickupnow", authUser, pickUpOrder);
module.exports = laundryRouter;
