const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
    },
    geoLocation: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
