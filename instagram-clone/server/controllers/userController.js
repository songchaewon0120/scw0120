const User = require("../models/User");
const fileHandler = require("../utils/fileHandler");
const { body, validationResult } = require("express-validator");
const { ValidationHalt } = require("express-validator/src/base");

// 입력 데이터의 유효성 검사 미들웨어

// 유저이름 유효성 검사
const isValidUsername = () =>
  body("username") // body는 express-validator에 있는 함수 | 유효성검사에 사용하는 모듈 (express-validator)
    .trim() // 문자열 앞뒤 공백 제거
    .isLength({ min: 5 }) // 5글자 이상
    .withMessage("Username must be at least 5 characters") // 조건이 안맞을때 나오는 메세지
    .isAlphanumeric() //알파벳과 숫자만 가능하게하는거
    .withMessage("Username is only allowed in alphabet and number.");

// 이메일 유효섬 검사
const isValidEmail = () =>
  body("email")
    .trim()
    .isEmail() // 유효성검사하는게 isEmail에 다 들어가있음?
    .withMessage("E-mail is not valid");

// 비밀번호 유효성 검사
const isValidPassword = () =>
  body("password")
    .trim()
    .isLength({ min: 5 }) // 5글자 이상
    .withMessage("password must be at least 5 characters");

// 이메일 중복 확인
const emailInUse = async (email) => {
  const user = await User.findOne({ email });
  //입력된 이메일로 유저를 검색함

  if (user) {
    return Promise.reject("E-mail is already in use");
    // 유저가 존재 하면 ~ (Promise.reject)
  }
};

// 유저이름 중복 확인
const usernameInUse = async (username) => {
  const user = await User.findOne({ username });
  // 입력된 유저이름으로 유저를 검색한다

  if (user) {
    return Promise.reject("Username is already in use");
    // 유저가 존재는 경우
  }
};

// 이메일 존재 확인
const doesEmailExists = async (email) => {
  const user = await User.findOne({ email });
  // 입력된 이메일로 유저를 검색한다

  if (!user) {
    // 유저가 존재하지 않을 경우
    return Promise.reject("User is not found");
  }
};

// 비밀번호 검사
const doesPasswordMatch = async (password, { req }) => {
  // 입력된 이메일로 유저를 검색한다
  const email = req.body.email;
  const user = await User.findOne({ email });

  //검색된 유저의 비밀번호와 입력된 비밀번호를 비교한다 (if)
  if (!user.checkPassword(password)) {
    //checkPassword -> model에 있음
    return Promise.reject("password does not match");
  }
};

// ↑이것들은 컨틀롤러에서 사용할거↑

// 유저 생성
exports.create = [
  isValidUsername().custom(usernameInUse), //중복검사
  isValidEmail().custom(emailInUse),
  isValidPassword(),
  async (req, res, next) => {
    //다 통과하면 유저생성 진행
    //유저생성 진행
    try {
      const errors = validationResult(req);
      //유효성 검사 결과

      if (!errors.isEmpty()) {
        //검사가 실패했을 때 | 400 BadRequest
        const err = new Error();
        err.errors = errors.array();
        err.status = 400;
        throw err;
      }

      //클라이언트가 전송한 데이터
      const { email, fullName, username, password } = req.body; //req.body 에 있는 ...password?

      //유저 생성(새로만드는거)
      const user = new User();

      user.email = email;
      user.fullName = fullName;
      user.username = username;
      user.setPassword(password); // setPassword 비밀번호 암호화 | model에서 작성함

      await user.save();

      // 클라이언트에게 생선한 유저 데이터를 전송한다
      res.json({ user });
    } catch (error) {
      next(error); // next는 error를 errorHandler에게 전달한다 | 모든 에러는 에러핸들러가 처리 | 에러핸들러는 App.js에 있음
    }
  },
];
// 유저 정보 수정
exports.update = [
  //프로필 사진 (파일 ) 처리
  fileHandler("profiles").single("avatar"),
  //유효성 검사
  //입력 데이터가 있을 경우 유효성 검사
  isValidUsername().custom(usernameInUse).optional(),
  isValidEmail().custom(emailInUse).optional(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      //검사실패
      if (!errors.isEmpty()) {
        const err = new Error();
        err.errors = errors.array();
        err.status = 400; // 400 badrequest
        throw err;
      }
      const _user = req.user; // req.user: 로그인 유저

      // 프로필 사진을 업로드한 경우
      if (req.file) {
        // req.file: 클라이언트가 전송한 파일
        _user.avatar = req.file.filename;
      }

      // 로그인유저의 정보 중 클라이언트가 수정요청을 한 정보만 업데이트한다
      Object.assign(_user, req.body); // req.body :수정된 정보같음
      await _user.save(); // 변경사항을 저장한다

      //토큰을 재발급
      const token = _user.generateJWT();

      const user = {
        username: _user.username,
        email: _user.email,
        fullName: _user.fullName,
        avatar: _user.avatar,
        bio: _user.bio,
        token
      }

      res.json({ user })

    } catch (error) {
      next(error);
    }
  },
];
// 로그인
exports.login = [
  isValidEmail().custom(doesEmailExists),
  isValidPassword().custom(doesPasswordMatch),
  async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.errors = errors.array();
        err.status = 401;
        throw err;
      }

      const { email } = req.body;

      const _user = await User.findOne({ email });

      const token = _user.generateJWT();
  
      const user = {
        username: _user.username,
        email: _user.email,
        fullName: _user.fullName,
        avatar: _user.avatar,
        bio: _user.bio,
        token
      }
  
      res.json({ user })
  
    } catch (error) {
      next(error)
    }
  }
]