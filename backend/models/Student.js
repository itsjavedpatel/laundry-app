const mongoose = require("mongoose");
const University = require("./University");

const studentSchema = new mongoose.Schema(
  {
    userName: {
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
    },

    contact: {
      type: String,
    },
    studentId: {
      type: String,
      required: true,
    },
    laundryId: {
      type: String,
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
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
