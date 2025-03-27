const mongoose = require("mongoose");
const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      select: true,
      // required: true,
    },
    address: {
      type: String,
    },
    zipcode: {
      type: Number,
      trim: true,
    },
    role: {
      type: String,
      default: "university",
      immutable: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    laundries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laundry",
      },
    ],
    delivery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
      },
    ],
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    validUpto: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: Boolean,
      default: false,
    },
    UGCcode: {
      type: String,
    },
    maxWash: {
      type: Number,
    },
  },
  { timestamps: true }
);
const University = mongoose.model("University", universitySchema);
module.exports = University;
