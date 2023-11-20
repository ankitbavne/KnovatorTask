const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
