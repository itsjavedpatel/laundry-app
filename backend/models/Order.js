const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laundry",
    },
    orderDetails: {
      weight: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        "To be picked up ",
        "Washing",
        "To be Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "To be picked up",
    },
    pickupDate: {
      type: Date,
      default: () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
        return tomorrow;
      },
    },
    deliveryDate: {
      type: Date,
      default: () => {
        const expected = new Date();
        expected.setDate(expected.getDate() + 5); // Add 5 day
        return expected;
      },
    },
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
