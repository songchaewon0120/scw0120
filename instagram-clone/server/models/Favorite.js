const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: { type: Schema.ObjectId, required: true },
    // 좋아요를 누른 유저
    article: { type: Schema.ObjectId, required: true },
    // 좋아요를 누른 게시물
  },
  {
    roJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
