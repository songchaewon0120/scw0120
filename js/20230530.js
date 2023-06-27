// //1 클래스와 인스턴스

// class Cat {
//   // 생성자 함수
//   // 인스턴스의 속성을 설정하기 위해 사용된다
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   // 클래스 멤버 (속성)
//   home = null;

//   // 클래스 멤버 (메서드)
//   sound() {
//     return "야옹"
//   }
// }

// // Cat의 인스턴스
// // Cat클래스로부터 생성된 객체
// var cat = new Cat("치즈", 2);

// // console.log(cat);
// // console.log(cat instanceof Cat) // true


// // cat의 속성에 접근
// console.log(cat.name) // 치즈
// console.log(cat.age) // 2
// console.log(cat.home) // null (상속)
// console.log(cat.sound()) // 야옹 (상속)

// // 상속: 코드의 재사용

// /*
//   2 static 속성과 static 메서드

//   인스턴스와 관련된 유용한 기능을 제공한다
// */

// class Cat {
  
//   // ... (생성자 함수, 클래스 멤버 등)

//   // static 속성
//   static family = "고양이과";

//   // static 메서드
//   static isAdult(age) {
//     if (age < 1) {
//       return "아기고양이"
//     } else {
//       return "성체고양이"
//     }
//   }
// }

// // 클래스 자체가 호출한다
// console.log(Cat.family) // 고양이과
// console.log(Cat.isAdult(2)) // 성체고양이


// // 자바스크립트에 내장된 클래스의 static 속성
// var pi = Math.PI;

// console.log(pi); // 3.14...


/*
  Q. 다음의 조건에 맞는 클래스를 정의하고 인스턴스를 만들어보세요

  클래스 이름: Beer

  인스턴스의 속성: name, origin

  클래스 멤버 (속성)
  history: 기원전 3000년

  클래스 멤버 (메서드)
  recipe(제조법): 밀, 홉, 효모, 물을 섞어 만듭니다

  static 속성
  caution(경고): 지나친 음주는 돈이 많이 듭니다
*/

class Beer {
  constructor(name, origin) {
    this.name = name;
    this.origin = origin;
  }

  history = "기원전 3000년";

  reicipe () {
    return "밀, 홉, 효모, 물을 섞어 만듭니다"
  };

  static caution = "지나친 음주는 돈이 많이 듭니다"

}

var irishBeer = new Beer("Guinness", "Ireland");
var dutchBeer = new Beer("Heineken", "Netherlands");

console.log(irishBeer) 
console.log(dutchBeer)



