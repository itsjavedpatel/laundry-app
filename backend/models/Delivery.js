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
      ref: "Student",
    },
  ],
  role: {
    type: String,
    default: "delivry",
    immutable: true,
  },

});

const delivery = mongoose.model("Delivery",deliverySchema);
module.exports = delivery;

