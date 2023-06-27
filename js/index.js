//console.log("Hello javaScript!")


/*
JavaScript 튜토리얼

1 데이터타입과 기본 메서드
2 연산자
3 조건문
4 반복문
5 변수
6 함수
7 배열
8 객체
9 클래스
10 에러와 에러처리
11 비동기 작업
12 JSON
*/

/*
데이터 타입

1 string (문자열)
2 number
3 boolean
4 null
5 undefined
6 bigint 
*/
//html과 다르게 주석이 중복처리가 가능하다
//는 한줄주석처리할때 사용
/*는 여러줄 주석처리할때 사용*/
/*
String(문자열)
연속된 문자
'',""안에 문자를 작성한다
*/
//var foo="bar";
// console.log(foo);//bar
// console.log(typeof foo);//string

//각각의 문자에 접근한다
// 0부터 시작
/* console.log(foo[0])//b
console.log(foo[1])//a
console.log(foo[2])//r */

//문자의 갯수 구하기
//console.log(foo.length)//3

// var foo="hello javascript"
// console.log(foo[5]);// 
// console.log(foo[6]);//j

/*
Number
값의 종류: 정수, 소수, NaN(Not a Number), +Infinity, -Infinity
*/
//정수
/*var year=2023;
console.log(year);//2023
console.log(typeof year);//number*/

//소수
/*var pi=3.14;
console.log(pi);//3.14*/

//NaN
//var nan=2-"foo";//숫자에서 문자를 뺌(잘못된 식)
//console.log(nan);//NaN

//Number이 표현할수있는 최대값
//var max_value=Number.max_value;
//console.log(max_value);//이 숫자값 이상은 infinity

//Number이 표현할수있는 최소값
//var min_value=-Number.max_value;
//console.log(min_value);//-infinity


//+infinity
//var infinity=Number.MAX_VALUE * 1.1;
//console.log(infinity)//Infinity 양의 무한대

//-infinity
//var negative_infinity=-Number.MAX_VALUE;
//console.log(negative_infinity);//-infinity 음의 무한대

/*
boolean
참 또는 거짓 (ture of flas)값을 갖는다.
*/

//var bool=true;
//console.log(bool); //true
//console.log(typeof bool);//boolean
////비교연산은 boolean값을 리턴한다
//console.log(1>0);//true

/* null
없음을 나타낸다
*/

//var foo=null;
//console.log(null);// null
//console.log(typeof foo);//object

/* undefined
정의되지 않은 변수
*/
//var foo;
//console.log(foo);//undefined
//console.log(typeof foo);//undefined

/* BigInt
안전한 정수(safe integer)밖의 정수를 나타낸다*/

//안전한 정수의 최대값
//var max_safe_integer=Number.MAX_SAFE_INTEGER;
//console.log(max_safe_integer);

//안전한 정수의 최소값
//var min_safe_integer=Number.MIN_SAFE_INTEGER;
//console.log(min_safe_integer);//-9007199254740991

//9가 16개
//var not_number_integer=99999999999999999;
//console.log(not_number_integer);//number타입으로 안전하지 않은 정수를 표현할 경우

//정수값 뒤에 n을 붙여서 Bigint를 선언한다
//var bigint=999999999999999n;
//console.log(bigint);//999999999999999n
//console.log(typeof bigint);//bigint
// let
// var
/*
기본 데이터 타입의 메서드
데이터에 특정한 작업을 수행한다

String 메서드
Number 메서드
*/
/*
String메서드

toUpperCase()
trim()
concat()
split()
*/

//toUpperCase()
//모든 문자를 대문자로 변환한다
//var foo="    b aR";
//console.log(foo.toUpperCase());//BAR

//trim()
//문자열 앞뒤의 공백을 제거한다 ex)유저가 입력한값을 정리할때 사용할수있음
//console.log(foo.trim());//baR

// let str = "    Hello, World!    ";
// // let trimmedStr = str.trim();

// // console.log(trimmedStr); // 출력: "Hello, World!"
// let str = "    Hello, World!    ";
// let trimmedStr = str.trimStart();

// console.log(trimmedStr); // 출력: "Hello, World!    "

// let trimmedStr = str.trimEnd();

// console.log(trimmedStr); // 출력: "    Hello, World!"

/*
//concat()
var foo="Hello";
var bar="JaveScript";

//A.concat(arg,B):A 문자열 뒤에 B문자열을 연결한다.(arg기준)
var result=foo.concat(" ",bar);//concatenate(연결)-->concat
console.log(result);//Hello JaveScript1
*/

// split(arg) : arg를 기준으로 문자열을 나눈다
// var foo="Hello JavaScript, hi";
// console.log(foo.split(" "));//" "안에 들어간거 기준으로 나눠서 보여짐

/*
Number메서드

toPrecision()
toString()
*/
/*
// to Precision()
var pi=Math.PI;
console.log(pi);//무리수인데 자바스크립트는 16자리의 숫자까지만 표현할수있다

//toPrecision(arg): arg(자릿수)
console.log(pi.toPrecision(50));//50자리까지의 숫자를 표현해라 , 정밀도
*/

// //to String()
// var year=2023;
//Number타입을 문자열로 변환한다
// console.log(year.toString());//문자로 나타남
// console.log(typeof year);

// var yearInNumber = 2023;

// var yearInString = yearInNumber.toString();

// console.log(yearInString)











//내가 정리한 js
//null
// var car = null; // 변수 car는 null 값을 가짐 (차량이 없음을 나타냄)
// console.log(car); // 출력: null

// var person = {
//   name: "John",
//   age: null // 변수 age는 null 값을 가짐 (나이를 알 수 없음을 나타냄)
// };
// console.log(person.age); // 출력: null
// //undefined
// var username; // 변수 username은 값이 할당되지 않았으므로 undefined
// console.log(username); // 출력: undefined

// function calculateSum(a, b) {
// //   return a + b;
// console.log(a + b)
//   // 반환 값이 지정되지 않았으므로 함수 calculateSum은 undefined를 반환함
// }

// calculateSum(1, 2)
// // console.log(calculateSum(5, 3)); // 출력: 8, undefined
//   // 함수 greet은 반환 값이 지정되지 않았으므로 undefined를 반환함

//   console.log(typeof undefined); // 출력: "undefined" (undefined의 타입은 "undefined")
//   console.log(typeof null); // 출력: "object" (null의 타입은 "object"인데, 이는 JavaScript의 역사적인 오류로 인해 발생한 것입니다. null은 실제로는 객체가 아닙니다.)
//   console.log(null === undefined); // 출력: false (null과 undefined는 다른 값이므로 비교 시 false를 반환함)
//   console.log(null == undefined); // 출력: true (null과 undefined는 동등 비교 시 true를 반환함)
  

// var str = "Hello World";
// var uppercaseStr = str.toUpperCase();

// console.log(uppercaseStr); // 출력: "HELLO WORLD"

// console.log(2)






/*
연산자

1 수리연산자
2 대입연산자
3 비교연산자
4 논리 연산자
5 타입 연산자
*/

/*수리 연산자
1 사칙연산
+ - * /
2 증가연산
++
3 감소연산
--
4 거듭제곱연산
**
5 계수연산
% 
*/

//사칙연산
// var add=1+2;
// var subtract=2-1;
// var divide=1/2;
// var multiply=1*2;
// console.log(add)
// console.log(subtract)
// console.log(divide)
// console.log(multiply)

// 증가연산자
// var i=1;
// 1씩 증가시켜라
// i++
// console.log(i)//2 

//감소연산자
// var i =1;
// i--;//1씩 감소시켜라
// console.log(i);//0

//거듭제곱연산자
// var exp=2*7;
//2와 7을 곱해라
// console.log(exp);//14

//계수연산
// var mod=5%2;
// console.log(mod);//1 소숨점이 나오지않음



/*
대입연산자

1 변수 대입 연산자
=
2 덧셈 대입 연산자
+=
3 빼기 대입 연산자
-=
4 곱하기 대입 연산자

*=
5 나누기 대입 연산자
/=
6 거듭제곱 대입 연산자
**=
7 계수 대입 연산자
%=

*/

// 변수대입 연산자
// var foo="bar"

//덧셈 대입 연산자
// 
// 
// var longVariablesName=1;
// lonVariablesName+=1;
// logVariablesName = lovgVariableName + 1
// console.log(lonVariablesName);//2

//대부분의 변수앞에는 대문자를 쓰지 않는다 대문자소문자 구분하기

/*
비교 연산자
1동등연산자
==
2비동등연산자
!==
3엄격 동등 연산자
===
4엄격 비동등연산자 
!==

5크다
>
6크거나 같다
>=
5작다
<
7작거나 같다
<=
*/

//동등연산
// console.log(1==2)
// console.log(foo=="bar")
// console.log(2023=="2023")
// console.log(null==undefined)//true
 
//엄격 동등연산
// console.log(1===2);
// console.log("foo"==="bar");
// console.log("foo"==="bar");
// console.log(2023==="2023");
// console.log(null==undefined);
//false
// false
// false
// false

//비동등연산
// console.lof(1 !-=2)//0
// console.lof("foo" !-="bar")//0
// console.lof(2023 !-="2023")//x
// console.lof(null !-=undefined)//x

//엄경 비동등 연산
// console.log(1 !==3)//ture
// console.log("foo"!=="bar")//ture
// console.log(2023!=="2023")//ture
// console.log(null!==undefined)//ture

/*
논리 연산자

&&(and)
expr1 && expr2
||(or)
expr1 || expr2
!(not)
! expr

*expr(expression) : 표현식*/

//and
//두 표 형식이 모두 참일때 true를 리턴한다
// console.log(1>0 && 1<2)//true

//or    
//두 표 형식중 하나만 참이면 true
// console.log(1>0||1>20)//true

//not  
// console.log(!(1>0))//flas

//boolean타입이 아닌 데이터를 부정할 경우
// console.log(!null)
// console.log(!undefined)

// console.log(!0)
// console.log(!2)
// console.log(!"")
// console.log(!"foo")


/*타입 연산자
 typeof
 instanceof

 */
// var foo="bar"
// console.log(typeof foo) // string

//if조건라
//  var year=2라23;
//  if(year---라023){
    // console라log("이번년도")
//  }else{"몰라"}

//if/elseiof/else
// var year=2023;

// if(year === 2022){
//     console.log("작년")
// }else if(year===2023){
//     console.log("이번년도")
// }else{
//     console.log("너무졸려")
// }

//switch조건문
//엄격 동등 연산을 수행한다.

// // var year=2023;

// switch(year){
//     case 2022:
//         console.log("작년")
//         bareak;
//         case 2023:
//             console.log("이번년도")
//             break;
//             case 2024:
//     console.log("내년")
//     break;
//     default:
//         console.log("모르겠습니ㅏㄷ")
//         }

/*
?(삼항연산자)조건문
조건 ? 값1 :값2
*/

// var year=2023;
// var r=year===2023?"이번년도":"이번년도가 아닙니다"
// console.log(r)

// var age=20;
// var r=age>=20?"성인입니다.":"성인이 아닙니다."
// console.log(r);

// var a=19
// if(a>=20)
//     {console.log("성인입니다.")}
// else
//     {console.log("성인이 아닙니다.")}
    
/*반복문
for반복문
while 반복문
*/
// 변수 초기값; 수행조건; 변수값증가
// for(var i=1; i<=10; i++){
//     console.log(i+"번실행되었습니다")
// }

// var sum = 0;
// for(var i=1; i<=10; i++){
//     sum+=i;
// }
// console.log(sum);

// break;continue;

//while반복문

// var i=1;
// while(i<=10){
//     console.log(i+"번 실행되었습니다")
//     i++;
// }






//Q. 1, 1/2, 1/3...1/10까지의 합을 반복문을 사용해서 구해보세요

// var a = 0

// for(var i=1; i<=10; i++){
//     a += (1/i)
// }
// console.log(a)

// var i=1
// var b=0

// while(i<=10){
//     b += (1/i)
//     i++
// }

// console.log(b)
// var b = 0;
// var i = 1;
// while (i <= 10) {
//     i++;
//     b += (1 / i);
// }
// console.log(b);




/*
변수
값을 저장하는 컨테이너

기본사용
변수의 범위
*/


//기본사용
// var foo="bar"//변수 초기화
// console.log(foo);//bar

// var foo="bar"//변수 초기화
// foo="baz"//재정의 가능
// console.log(foo)//baz 출력

// var foo;//값을 넣어주지 않고 선언만함(선언)
// foo="bar"//값을 넣어줌(정의)-->정의 안해주면 undefined가 출력됨
// console.log(foo)//출력됨

/*
변수의 범위

전역 변수
(global variables)
지역 변수
(local variables)
*/

//전역변수
//첫글자는 소문자로 단어의 첫번째만 대문자
//함수 밖에서 선언된 함수, 소스코드 어디에서든지 접근이 가능하다.
// var varInGlobal=true;
// console.log(varInGlobal);//true

//지역변수
//첫글자는 소문자로 단어의 첫번째만 대문자
//함수 안에서 선언된 함수, 선언된 함수 안에서만 사용이 가능하다.
// function f(){
// var varInLocal=true;
// }
// consonle.log(varInLocal);//에러 뜸 선언한 f함수 밖에서 사용했기 때문에 에러뜸?

/*
함수
호출될때마에만 실행되는 코드

함수 선언
Hoisting
매개변수와 인자
return
callback
*/

/*함수 선언

함수 선언식
함수 표현식
*/

//함수 선언식

// function f() {//function 함수이름 () {함수 정의}
//     console.log("foo");
// }
// f();//함수 이름{}  만들어둔 function을 불러오는건가?

//함수 표현식
//변수에 익명함수를 할당한다
// var f = function(){//익명인 이유 이름이 없음
//     console.log("foo");
// }
// f()//함수호출 얘가 불러오는거 없으면 안불러짐

//Hoisting (게양) 올라간다는 뜻; 표현함수아님 선언식일때만 사용됨
//선언을 호출보다 위에 해줘도 작동함
// f();

// function f(){
//     console.log("foo")
// }

//f()//f is not a function
//선언식이 아니라서 안먹힘
// var f=function (){
//     console.log("foo")
// }

//매개변수와 인자 (parameter and argument)

// function add(x,y){//x,y가 매개변수가 됨
//     console.log(x+y)
// }
// add(1,2)//1,2가 인자가 됨

/*
 return
 */

//  function add(x,y){
//     return x+y
//  }
// var r=add(1,2)
// console.log(r)//3 r이라는 변수에다가 add값을 담음

//casllback
//함수 인자

/*이해 못함*/
// function f(callback){
//     var r =callback()
//     console.log(r)
// }
// function cb(){
//     return "foo"
// }
// function aa(){
//     return "hi"
// }
// f(aa);//foo





//콜백예시

// function getTime(){
//     //현재 시간을 return한다
//     var time= new Date().toLocaleTimeString();
//     console.log(time)
// }
// setInterval(getTime, 1000)//1초마다 callback함 1000ms=1s

//나이를 전달받아서 성인이면 "성인입니다."아니면"성인이 아닙니다"를 출력하는 함수를 만들어보세요

// function age(callback){
//     var a=callback()
//     if(a>=20){console.log("성인입니다.")}
//     else{console.log("성인이 아닙니다.")}
// }
// function b(){
//     return 20
// }
// function c(){
//     return 16
// }
// age(c);

// function isAdult(age){
// // if(typeof age === "number"){
// //     console.log("성인입니다.")
// // }else{console.log("숫자만 입력가능합니다.")}
//     if(typeof age !== "number")
//     {
//         return console.log("숫자만 입력가능합니다.")
//     }
//     if (age>=20){
//     console.log("성인입니다.")
//     }else{
//     console.log("성인이 아닙니다.")}
//     }
// isAdult("18")



// var r = new Date().toLocaleTimeString();

// console.log(r)


/*배열(array)
한개 이상의 값을 가지는 데이터타입

배열의 아에템에 접근하기
배열의 메서드
배열 순회하기
*/

// var arr=["foo","bar","baz"]

// //문자열 배열 ""단위로 계산하는듯 index는 0부터 시작
// console.log(arr[2])//baz
// console.log(arr[0])//foo
// console.log(arr[1])//bar

// //아이템의 갯수를 구하는법 마찬가지로 ""단위로 계산하는듯
// console.log(arr.length)//3

//아이템 배열의 값 변경하기

// arr[2]="baz"
// console.log(arr[2])//baz

//아이쳄 배열에 값 추가하기
// arr[3]="hi"
// arr[5]="lol"
// console.log(arr[4])//undefined 
// console.log(arr.length)//6 undefined는 비워두고 계산하는듯


//배열 메서드
//배열에 특정한 작업을 수행한다
/*
Array.push()
Array.pop()
Array.concat()
Array.sort() 콜백해서 abc순으로 정렬할수있음
.splice() 중간에 원하는곳에 아이템을 추가함 선택한 위치기준 왼쪽에 추가됨(위치,위치?,추가할아이템) 제거할때는 추가할아이템을 안적으면 제거됨
reverse();반대로 정렬
shift() 가장 맨앞에있는 아이템을 제거함
unshift()가장 맨뒤에 있는 아이템을 제거함

*/

//push()
// var arr=["foo","bar","c","a"]
// arr.push("baz")
// //배열에 새로운 아이템을 가장 마지막에 추가한다.
// console.log(arr)//foo bar baz

//pop()
// arr.pop()
// //가장 마지막 배열의 아이템을 제거한다. 다른 글자가 들어가도 마지막에 배열된 아이템만 제거함
// console.log(arr)

//concat()
// var arr1=["foo","bar"]
// var arr2=["fodo","bdar"]

// var r= arr1.concat(arr2)
// //array1.concat(array1, array2...)
// //array1에 뒤에 배열을 연결(concatenate)한다
// console.log(r)

// //sort 배열을 acb순으로 뒤집음
// arr.sort()
// console.log(arr)



/*배열 순회하기
배열에 특정한 작업을 수행한다*/
// var arr=["foo","aoo","baa"]

// for(var i = 0; i<arr.length; i++){
//     console.log(arr[i].toUpperCase())
// }
//배열 순회를 통해서 각각아이템에 특정한 작업을 수행한다


// var arr=["foo","aoo","baa","mbo"]

// for(var i = 0; i<arr.length; i++){

// if(arr[i][0]==="b"){//b로 시작하는 단어를 보여줘라 0부터 시작해서 for가 반복문이니까 검사한다고 생각하면될듯
//     //인덱스가 두개가 사용되었는데 첫번째 인덱스는 어디에서 찾을건가 두번째는 어디부터 접근할건가
//     console.log(arr[i])
// }}









