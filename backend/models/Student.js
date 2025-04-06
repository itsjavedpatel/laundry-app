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
        default: [],
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
    washCount: {
      type: Number,
      default: 0,
    },
    lastWashReset: {
      type: Date,
      default: Date.now,
    },
    notifications: [
      {
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
