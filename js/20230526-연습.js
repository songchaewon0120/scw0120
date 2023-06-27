// var arr = [100,5,80,30,2]
// console.log(arr.reverse())
// console.log(arr.reverse())

// function a(callback){
//     var r = callback() // add
//     console.log(r)
// }

// function cb(x, y) {
//     return x + y
// }

// a(function () {
//     return cb(1, 2)
// })

// function test(x,y,a){
//     return x+y+a
// }

// console.log(test(1, 2, 3))

// function text2(a){
//    var u = a.toUpperCase()
//    console.log(u)
// }
// text2("tjkels")


var arr = ["foo", "bar", "baz"];

function f(test1) {

    for(i=0; i<test1.length;i++){
        console.log(arr[i].toUpperCase())
    }
}

f(arr)