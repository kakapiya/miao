function countBy(collection, iteratee = identity) {
    iteratee = shorthand(iteratee)
    let res = {}

    if (theTypeOf(collection) == "array") {
        for (e of collection) {
            if (res[iteratee(collection[e])] == undefined) {
                res[iteratee(collection[e])] = 1
            }
            else {
                res[iteratee(collection[e])]++
            }
        }
    }

    if (theTypeOf(collection) == "object") {
        for (e of collection) {
            if (res[iteratee(collection[e])] == undefined) {
                res[iteratee(collection[e])] = 1
            }
            else {
                res[iteratee(collection[e])]++
            }
        }
    }
    return res 
}