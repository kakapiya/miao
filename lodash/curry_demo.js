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