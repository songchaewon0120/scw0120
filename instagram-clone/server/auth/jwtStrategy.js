// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const User = require("../models/User");

// require("dotenv").config();

// // 옵션객체
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// // jetFromRequest : 요청토큰 | ExtractJwt : 토큰을 추출한다 | fromAuthHeaderAs : 헤더로 부터 | BearerToken : 토큰을
// // 합치면 요청 헤더로부터 로그인 토큰을 추출한다
// opts.secretOrkey = process.env.SECRET;
// // SECRET : 로그인토큰 생성할때 사용한 거 | 토큰 해석에 사용할 SECRET
// // 인코딩 디코딩 할때 같은 SECRET을 사용하고있다.
// // 인코딩: 정보의 형태나 형식을 변환하는 처리나 처리 방식이다. | 디코딩: 부호화(encoding)된 정보를 부호(code)화되기 전으로 되돌리는 처리 혹은 그 처리 방식을 말한다.

// //----------------------------------------------------------------------------

// //토큰처리 Strategy(방법) 생성

// const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
//   try {
//     const user = await User.findOne({ username: jwt_payload.username });
//     // findOne은 토큰에 담긴 username과 일치하는 유저 컬렉션을 검색함
//     // jwt_payload : payload 에는 유저에 대한 데이터가 담겨있음 | jwt에는 헤더와 페이로더와 싱내추럴이 있다? 그중에서 페이로더 | 유저가 있으면 인증성공이고 없음 실패

//     if (!user) {
//       // 유저가 없다면  (if문이니까 !user) (실패) (true)
//       return done(null, false);
//     }
//     // 인증성공 (false)
//     return done(null, user);
//   } catch (err) {
//     done(err, false);
//   }
// });

// module.exports = jwtStrategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {

    const user = await User.findOne({ username: jwt_payload.username });

    if (!user) {
      return done(null, false);
    }
    
    return done(null, user);

  } catch (err) {
    done(err, false);
  }
})

module.exports = jwtStrategy;

