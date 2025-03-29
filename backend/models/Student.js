const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      select: true,
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    studentId: {
      type: String,
      unique: true,
      required: true,
    },
    laundryId: {
      type: String,
      unique: true,
      required: true,
    },
    hostel: {
      type: String,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    roomNo: {
      type: Number,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      default: "student",
      immutable: true,
    },
    status: {
      type: String,
      default: "inactive",
    },
    validUpto: {
      type: Date,
    },
    wash: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
