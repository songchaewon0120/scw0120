const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
// luxon 데이터 강화하는? 모듈

//스키마 (구조)
const articleSchema = new Schema(
  {
    photos: [{ type: String, require: true }],
    // 사진 photos
    description: { type: String },
    // 사진에 대한 설명 description
    author: { type: Schema.ObjectId, require: true, ref: "User" }, //ref: "User"},: 조인과 관련된 부분
    // 게시물 작성자 author
    favoriteCount: { type: Number, default: 0 },
    // 좋아요 갯수 | default: 0: 0으로 시작
    created: { type: Date, default: Date.now },
    // 게시물 생성 일자 | 기본값: 게시물 생성시간
    // 보기에 좋지 않아서 가상의 필드를 만들어서 보여줌
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 버추얼 필드 ( 보여주기 용 날짜 생성 )
// 가상의 필드 | 스키마에 존재하지 않는 필드라서 버추얼필드라고 부름 | 지역성을 고려(한글로 나타남)
// 필드의 이름은 : displayDate
articleSchema.virtual("displayDate").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(DateTime.DATE_MED); // created값을 사용해서 만듬
});

// 컬렉션 조인 하는 이유
// 1. 댓글 갯수 파악
articleSchema.virtual("commentCount", {
  ref: "Comment", //Comment 컬렉션과 조인함
  localField: "_id",
  foreignField: "article",
  count: true,
});

// 2. 좋아요 여부 확인
articleSchema.virtual("isFavorite", {
  ref: "Favorite", //Favorite 컬렉션과 조인함
  localField: "_id",
  foreignField: "article",
  count: true,
});

module.exports = mongoose.model("Article",articleSchema);
