function demo1(a, b, c) {
    console.log(a + b + c);
}

// demo1("https://", "www.", "baidu.com")

//https://参数复用


// let curried = curry(demo1)
// curried("hello")


function demo1_curring(a) {
    return function (b, c) {
        console.log(a + b + c);
    }

}


// let curried = demo1_curring("https://")
// curried("www.", "baidu.com")

//curried后函数的实参，就是传递给原函数的实参

//柯里化兼容性检测
//柯里化延迟执行
function foo(a, b, c) {
    return [a, b, c]
}
function curry(func) {


    //curried
    return function () {
        //先将第一个括号的参数传入args里
        let args = Array.prototype.slice.call(arguments)

        //curried(args) 返回的还是函数
        let inner = function () {
            args.push(...arguments)
            return inner
        }

        //利用返回的函数会调用toString这个特性
        //因为递归调用inner，所以最后返回的始终是函数，利用这种递归调用，变量被存在args中
        //此时将这些参数拿出来用即可
        inner.toString = function () {
            return func(...args)
        }

        //延迟调用的参数再次压入
        return inner
    }

}


var abc = function(a, b, c) {
    return [a, b, c];
  };
   
let curried = curry(abc)
let res = curried(1)(_,3)(2).toString()