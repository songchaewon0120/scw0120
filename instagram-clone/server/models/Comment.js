const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String },
    // 댓글 내용
    article: { type: Schema.ObjectId, required: true },
    // 댓글을 단 게시물
    author: { type: Schema.ObjectId, required: true, ref: "User" },
    // 댓글 작성자
    created: { type: Date, default: Date.now },
    // 댓글 작성일
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Comment", commentSchema);
