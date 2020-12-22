
function ary(func, n = func.length) {
    return function (...args) {
        return func(...args.slice(0, n))
    }

}

function before(n, func) {
    let c = 0
    let res
    return function (...args) {
        if (c < n) {
            return res = func.call(this, ...args)
            c++
        } else {
            return res
        }
    }
}


function after(n, func) {
    let c = 0
    let res
    return function (...args) {
        c++
        if (c > n) {
            return res = func.call(this, ...args)
        }
    }
}

function flip(func) {
    return function (...args) {
       return func(...args.reverse())
    }
}


function negate(predicate) {
    return function (...args) {
       return !predicate(...args)
    }
}

function every(array,predicate) { 
    return !some(array,negate(predicate))
}

function spread(func) { 
    return function (ary) { 
        func.apply(this,ary)
    }
}