const mongoose = require("mongoose");

const BlackListedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
const BlacklistTokenModel = mongoose.model(
  "blacklistToken",
  BlackListedTokenSchema
);
module.exports = BlacklistTokenModel;
