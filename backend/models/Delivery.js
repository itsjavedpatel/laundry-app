const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema({
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
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  role: {
    type: String,
    default: "delivery",
    immutable: true,
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
