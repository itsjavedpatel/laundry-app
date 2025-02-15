const mongoose = require("mongoose");
const universitySchema = new mongoose.Schema({
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
    required: true,
  },
  address: {
    type: String,
  },
  zipcode: {
    type: Number,
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const University = mongoose.model("University", universitySchema);
module.exports = University;
