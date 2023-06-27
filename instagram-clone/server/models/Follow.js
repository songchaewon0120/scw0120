const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    follower: { type: Schema.ObjectId, required: true, ref: "User" },
    // follow 한 유저
    following: { type: Schema.ObjectId, required: true, ref: "User" },
    // follow 받은 유저
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Follow", followSchema);
