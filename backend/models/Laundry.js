const mongoose = require("mongoose");
const laundrySchema = new mongoose.Schema(
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
      immutable: true,
      trim: true,
    },
    password: {
      type: String,
      select: true,
    },
    laundryId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      default: "laundry",
      immutable: true,
    },
    maxWash: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true }
);

const Laundry = mongoose.model("Laundry", laundrySchema);
module.exports = Laundry;
