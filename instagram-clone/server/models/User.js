const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //암호와 관련된 모듈

//------------------------------------------------------

//유저 스키마 (구조)
// 보여지는 정보들? 있음

const userSchema = new Schema(
  {
    username: { type: String, required: true, minLength: 3, maxLength: 100 },
    // 아이디 | minLength: 최소 길이 | maxLength: 최대길이
    password: { type: String, minLength: 5 },
    // 비밀번호
    salt: { type: String },
    // 비밀번호 암호화에 사용하는 키
    email: { type: String, required: true, maxLength: 100 },
    // 이메일
    fullName: { type: String },
    // 사용자의 이름
    avatar: { type: String, default: "default.png" },
    // 프로필 사진
    bio: { type: String },
    // 자기소개
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // 궁금한거 : virtuals가 뭔지 | 만약 자녀가 있다면 뭘 원했을때 마트에 가서 재료들을 사올텐데 그 재료들을 섞어서 뭔가를 만듬 | 필요한 데이터들을 갖고와서 가공해서 만듬 컬렉션이 원하는거? | table join검색하면 나옴 그림
  }
);

//-------------------------------------------------------------------------------------------

// 유저 모델의 오퍼레이션 (Operation)
// 보이지않는 정보들? 있음

// 1. 로그인 토큰생성
userSchema.methods.generateJWT = function () {
  // jwt 로그인 토근 생성에 username을 추가한다
  return jwt.sign({ username: this.username }, process.env.SECRET);
}; // SECRET을 사용하여 토큰을 생성한다

// 2. 비밀번호 암호화
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  //salt: 암호화에 사용하는 키
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 310000, 32, "sha256") // 비밀번호 암호화에 사용하는 알고리즘 이름(pbkdf2Sync) | 동기함수라는 뜻 | 씽크? | 원래는 비동기함수로 개발됐다가 | 동기는 씽크? 비동기는 에이씽크?
    // sha256 : 알고리즘?
    .toString("hex");
};
// 해시함수를 사용한 단방향 암호화 : (sha256)
// 양방향과 단반향 : 단반향은 복구를 할 수 없어서 비밀번호는 단반향?

// 3. 비밀번호 일치 여부 검사
userSchema.methods.checkPassword = function (password) {
  // 유저생성에 사용되었던 salt를 가지고 로그인시 입력받은 비밀번호를 암호화한다

  const hashedPassword = crypto
    .pbkdf2Sync(password, this.salt, 310000, 32, "sha256")
    .toString("hex");
  // 비밀번호 암호화했을때랑 같아야함
  return this.password === hashedPassword;
  // 비교함
};

// 컬렉션 조인 (데이터 가공)
userSchema.virtual("isFollowing", {
  ref: "Follow", // Follow컬렉션과 조인
  localField: "_id",
  foreignField: "following",
  justOne: true,
});

module.exports = mongoose.model("User", userSchema);
