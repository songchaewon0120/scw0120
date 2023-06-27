# memo

MVC -> model-view-controller
모델은 데이터 처리 뷰는 보이는거 컨트롤러는 로직?

기록을 저장하고 관리하는 모듈은 -> morgan

CORS의 약자 및 뜻은? -> 뜻 : 교차출 처리소스 공유 | 약자 : Cross-Origin Resource Sharing | 최초 자원이 서비스된 도메인 밖의 다른 도메인으로부터 요청할 수 있게 허용하는 구조이다. | 정책 | 공공데이터 서버 갖고왔을때 걔네가 cors를 허용해줘서 우리가 쓸 수(공유) 있었던것 데이터 받아오려면 허가받는거인듯? 약간 저작권같은느낌 서버가 허가해야함 서버가갑

express앱에서 파일 처리를 담당하는 모듈의 이름은? -> multer (이것뿐 아니라 다 쓰는듯한 느낌)

모델의 구조를 나타내는 용어는? -> 스키마 (보임) schema

모델에서 모델이 하는 일을 나타내는 용어는? -> 오퍼레이션 (안보임) opeeration

sync와 async의 (synchronous, astnchronous) 뜻은? -> sync는 동기함수 async는 비동기함수

NoSQL에서 관련된 데이터를 그룹화하는 기준을 부르는 말은? -> Collection

---

HTTP 요청 메서드

GET -> 데이터 읽기 요청
POST -> 데이터 생성 요청
PUT -> 데이터 수정 요청
DELETE -> 데이터 삭제 요청

이외에도 서버의 응답상대 (404오류같은거 구글링해서 알기)

---

Body 에서 raw에다가

{
"email" : "이메일 주소"
"fullName" : ""
"username" : ""
"password" :
}
이런식으로 어디다가 요청하면 받을수 있음 User에 대한 정보들?

비밀번호랑 salt가 암호화되어서 저장됨 인코딩?

"bio" : "aaa"

---

데이터 베이스에 100개의 어떤것에 대한 기사가 있다

각 기사의 아이디는 1 - 100

생성날짜 기준 오른차순으로 정렬되어있다.

가장 오랜된것은 10페이지에 10번째

가자 최근은 1페이지의 1번째

limit은 10 (하나의 페이지에 10개 게시물이 있으니까? 1페이지 limit은 10?)

skip은 10 페이지는 skip이 0
9페이지의 skip은 10
8페이지는 20
(limit 이 10이고 8페이지의 skip은?)
24 <- 게시물의 아이디값?

---

localhost:3000/api/articles?username=bunny
-> ?는 요청변수
->

---

파일전송은 json이 아니고 form-data
(사진파일?)
key에 text가 아니고 file로 변경 (postman)
key이름을 photos로 넣어줬음
그리고 value값에 사진을 넣어줌
key에 이름을 description이라고 넣어줌 (게시물 글?)
자연사진이라고 value값에 넣어줌

-> 두개의 사진이랑 자연사진이라는 게시물글이 업로드됨

## server - files - articles에 파일전송한 사진들이 올라와야 함

이메일과 username이 모두 유효하지 않을 때
Object.keys(_error).length값은?

정답 : 2

            if (Object.keys(_error).length > 0) {
                throw _error;
            }

여기서 에러가 나려면 _error의 length값이 0초과여야 해서

그리고 오류난거 (이름이나 아이디) 갯수만큼 _error에 속성추가됨
이메일와 username이 모두 유효하지 않을때는 두개가 유효하지 않는거라 둘다 속성에 추가되서 _error의 속성은 2개가 되는거

---

console.log(Object.keys(newUser))
const newUser = { email, fullName, username, password }

이거는 정답이 4개

email, fullName, username, password 이게 다 key값이니까? 4개 {}로 하나로 보면 안됨




indexOf 몇번째 뭐가 있는지 알려줌
만약에 찾는게 없으면 -1을 리턴함
false가 아님