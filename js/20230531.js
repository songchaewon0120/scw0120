// var btn = document.getElementById("btn");

// btn.addEventListener("click",function(){
//     btn.type="text"
// })
// console.log(btn.type);

// console.log(foo) // ReferenceError: foo is not defined

// try { // 여기서 코드를 작성한다

//   // ...\


//   console.log(foo)

// } catch (error) { // 에러 처리
//   console.error(error);
// }
//   var foo;
// ReferenceError
// 존재하지 않는 변수를 참조했을 때 발생한다

// try {

//   console.log(foo) // foo is not defined

// } catch (error) {
//   console.error(error);
// }


// TypeError
// 변수나 인자가 유효한 타입이 아닐 때 발생한다

// try {

//   // setInterval(callback, ms): ms마다 callback을 실행하는 함수
//   setInterval(null, 1000); // The "callback" argument must be of type functon.
//   // Received null

// } catch (error) {
//   console.error(error);
// }

// 4 커스텀 에러
// 필요할 경우 에러를 발생시킨다
// 로그인 등





<script>

try {
  var age = 15;

  console.log("학생:", "아저씨 기네스 한병 주세요");

  if (age < 18) {
    // 커스텀 에러를 던진다
    throw "미성년자는 술을 살 수 없습니다"
  }

  // 아래 코드는 실행되지 않는다
  console.log("직원:", "네 여기있습니다");

} catch (error) {
  console.error(error)
}
</script>