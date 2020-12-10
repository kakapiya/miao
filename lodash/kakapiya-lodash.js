var kakapiya = (function () {

    function theTypeOf(e) {
        if (typeof e == "number") return "number"
        if (typeof e == "string") return "string"
        if (typeof e == "function") return "function"
        if (Array.isArray(e)) return "array"
        if (typeof e == "object") return "object"
    }

    //分组
    function chunk(arr, size = 1) {
        let res = []
        let count = 0

        for (let i = 0; i < arr.length;) {
            let s = size
            let e_arr = []
            while (s--) {
                if (arr[i++]) {
                    e_arr.push(arr[i - 1])
                    count++
                }
            }
            res.push(e_arr)
            if (i + size > arr.length) break
        }

        let e_arr = []
        for (let i = count; i < arr.length; i++) {
            e_arr.push(arr[i])
        }
        if (count - arr.length) res.push(e_arr)
        return res
    }

    //去非
    function compact(arr) {
        let res = []
        for (e of arr) {
            if (e) res.push(e)
        }
        return res
    }

    // 找other外的数
    function difference(arr, ...other) {
        let res = []
        let other1 = []
        for (e of other) {
            other1.push(...e)
        }
        for (let i = 0; i < arr.length; i++) {
            let isInclude = other1.includes(arr[i])
            if (!isInclude) res.push(arr[i])
        }
        return res
    };

    // 找other外的数
    function differenceBy(arr, ...args) {
        let res = []
        let other1 = []
        let other = args.slice(0, args.length - 1)
        let iteratee = args[args.length - 1]
        for (e of other) {
            other1.push(...e)
        }
        if (theTypeOf(iteratee) == "function") {
            other1 = other1.map(e => iteratee(e))
            for (let i = 0; i < arr.length; i++) {
                let isInclude = other1.includes(iteratee(arr[i]))
                if (!isInclude) res.push(arr[i])
            }
            return res
        }

        //返回值组成的数组

        other1 = other1.map(e => {
            return e[iteratee]
        })
        for (let i = 0; i < arr.length; i++) {
            let isInclude = other1.includes(arr[i][iteratee])
            if (!isInclude) res.push(arr[i])
        }
        return res
    };


    // 找other外的数
    function differenceWith(arr, ...args) {
        let res = []
        let other = args[0][0]
        let comparator = args[1]

        res[0] = arr.filter(e => {
            return comparator(e, other)
        })

        return res
    };


    //拼接数组
    function join(arr, sep) {
        let res = ''
        for (let i = 0; i < arr.length - 1; i++) {
            res += arr[i] + (sep + "")
        }

        return res + arr[arr.length - 1]
    }

    function last(arr) {
        return arr[arr.length - 1]

    }

    function lastIndexOf(arr, val, ...args) {
        let from = 0
        if (args.length > 0) {
            from = args[0]
            if (from <= 0) return -1
        }
        for (let i = arr.length - 1 - from; i >= 0; i--) {
            if (arr[i] == val) {
                return i
            }
        }
        return -1
    }

    function drop(arr, n = 1) {
        if (n >= arr.length) return []

        let res = []
        for (let i = n; i < arr.length; i++) {
            res.push(arr[i])
        }
        return res
    }

    function dropRight(arr, n = 1) {
        if (n >= arr.length) return []
        let res = []
        for (let i = 0; i < arr.length - n; i++) {
            res.push(arr[i])
        }
        return res
    }

    function fill(arr, val, ...args) {
        let start = 0
        let end = arr.length
        if (args.length == 1) {
            start = args[0]
        } else if (args.length == 2) {
            start = args[0]
            end = args[1]
        }
        for (let i = start; i < end; i++) {
            arr[i] = val
        }
        return arr
    }

    //find 三部曲

    //pass
    function findIndex(arr, predicate, fromIndex = 0) {
        if (typeof predicate == "function") {
            for (let i = fromIndex; i < arr.length; i++) {
                if (predicate(arr[i])) {
                    return i
                }
            }
            return -1
        }
        if (Array.isArray(predicate)) {
            let key = predicate[0];
            let val = predicate[1];
            for (let i = fromIndex; i < arr.length; i++) {
                if (arr[i][key] == val) return i
            }

            return -1
        }
        if (typeof predicate == "object") {
            let o = JSON.stringify(predicate);
            for (let i = fromIndex; i < arr.length; i++) {
                if (JSON.stringify(arr[i]) == o) return i
            }
            return -1
        }

        if (typeof predicate == "string") {
            let key = predicate;
            for (let i = fromIndex; i < arr.length; i++) {
                if (arr[i][key]) return i
            }
            return -1
        }
    }

    //pass
    function findLastIndex(arr, predicate, fromIndex = 0) {
        if (typeof predicate == "function") {
            for (let i = arr.length - 1 - fromIndex; i >= 0; i--) {
                if (predicate(arr[i])) {
                    return i
                }
            }
            return -1
        }
        if (Array.isArray(predicate)) {
            let key = predicate[0];
            let val = predicate[1];
            for (let i = arr.length - 1 - fromIndex; i >= 0; i--) {
                if (arr[i][key] == val) return i
            }

            return -1
        }
        if (typeof predicate == "object") {
            let o = JSON.stringify(predicate);
            for (let i = arr.length - 1 - fromIndex; i >= 0; i--) {
                if (JSON.stringify(arr[i]) == o) return i
            }
            return -1
        }

        if (typeof predicate == "string") {
            let key = predicate;
            for (let i = arr.length - 1 - fromIndex; i >= 0; i--) {
                if (arr[i][key]) return i
            }
            return -1
        }
    }


    //flatten 三部曲
    function flatten(arr) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                for (e of arr[i]) {
                    res.push(e)
                }
            } else {
                res.push(arr[i])
            }
        }
        return res
    }

    function flattenDeep(arr) {
        //base case 
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                let flattenArr = flattenDeep(arr[i]);
                for (let j = 0; j < flattenArr.length; j++) {
                    result.push(flattenArr[j]);
                }
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    }

    function flattenDepth(arr, depth = 1) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (depth > 0 && Array.isArray(arr[i])) {
                let flattenArr = flattenDepth(arr[i], depth - 1);
                for (let j = 0; j < flattenArr.length; j++) {
                    result.push(flattenArr[j]);
                }
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    }

    // pass
    function reverse(arr, ...args) {
        let start = 0
        let end = arr.length - 1
        if (args.length == 1) {
            start = args[0]
        } else if (args.length == 2) {
            start = args[0]
            end = args[1]
        }
        while (start < end) {
            let tmp = arr[start]
            arr[start] = arr[end]
            arr[end] = tmp
            start++
            end--
        }
        return arr
    }


    // no test
    function every(arr, boolean) {
        if (boolean != Boolean) {
            if (findIndex(arr, boolean) != -1) return true
            return false
        }

        for (e of arr) {
            if (typeof e != "boolean") return false
        }
        return true
    }

    function some(arr, boolean) {

        if (ever(arr, boolean)) {
            return true
        }
    }

    //pass
    function toArray(val) {
        if (Array.isArray(val)) {
            return val
        }
        let res = []
        if (typeof val == "object" || typeof val == "string") {
            for (k in val) {
                res.push(val[k])
            }
        }
        if (typeof val == "number" || !val) {
            return []
        }
        return res
    }

    // pass
    function sortedIndex(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (val <= arr[i]) {
                return i
            }
        }
        return arr.length
    }

    function concat(arr, ...args) {
        arr.push.apply(arr, ...args)
        return arr
    }

    function toPairs(object) {
        let res = []
        for (key in object) {
            let item = []
            item.push(key)
            item.push(object[key])
            res.push(item)
        }
        return res
    }

    function fromPairs(pairs) {
        let res = {}
        for (item of pairs) {
            res[item[0]] = item[1]
        }
        return res
    }

    function head(array) {
        return array[0]
    }

    function indexOf(arr, val, fromIndex = 0) {
        return arr.indexOf(val, fromIndex)
    }

    function initial(array) {
        return array.slice(0, array.length - 1)
    }

    // no test
    function curry(func, arity) {
        return function curried(fixedArgs) {
            func(fixedArgs)
        }

    }

    function groupBy(collection, iteratee) {
        let res = {}
        if (typeof iteratee == "function") {
            for (let i = 0; i < collection.length; i++) {
                let key = iteratee(collection[i])
                if (!res[collection[i][key]]) {
                    res[collection[i][key]] = [collection[i]]
                } else {
                    res[collection[i][key]].push(collection[i])
                }

            }
            return res
        }

        if (typeof iteratee == "string") {
            let key = iteratee;
            for (let i = 0; i < collection.length; i++) {
                //res对象的collection[i][key]键对应的值（数组）
                //res[one[length]]
                if (!res[collection[i][key]]) {
                    res[collection[i][key]] = [collection[i]]
                } else {
                    res[collection[i][key]].push(collection[i])
                }
            }
            return res
        }
    }

    function keyBy(collection, iteratee) {
        let res = {}
        if (typeof iteratee == "function") {
            for (let i = 0; i < collection.length; i++) {
                let key = collection[iteratee(collection[i])]
                res[key] = collection[i]

            }
            return res
        }
        if (Array.isArray(iteratee)) {
            let key = iteratee[0];
            for (let i = 0; i < collection.length; i++) {
                res[collection[i][key]] = collection[i]
            }

            return res
        }
        if (typeof iteratee == "object") {
            let key = iteratee;
            for (let i = 0; i < collection.length; i++) {
                res[collection[i][key]] = collection[i]
            }

            return res
        }

        if (typeof iteratee == "string") {
            let key = iteratee;
            for (let i = 0; i < collection.length; i++) {
                res[collection[i][key]] = collection[i]
            }
            return res
        }

    }

    // unfinished
    function isEqual(val, other) {
        if (theTypeOf(val) !== theTypeOf(other)) return false
        if (val.length !== other.length) return false

        if (theTypeOf(val) === "arrays") {
            for (let i = 0; i < val.length; i++) {
                if (!isEqual(val[i], other[i])) return false
            }
        }

        if (theTypeOf(val) === "object") {
            for (key in val) {
                if (!isEqual(val[key], other[key])) return false
            }
        }

        if (val === other) return true
        return false
    }

    function identity(...args) {
        return args[0]
    }

    function isMatch(object, source) {
        for (e in source) {
            if (!isEqual(object[e], source[e])) return false
        }
        return true
    }

    function matches(source) {
        return function f(object) {
            for (e in source) {
                if (!isEqual(object[e], source[e])) return false
            }
            return true
        }

    }

    function matchesProperty(path, srcValue) {
        for (e of path) {
            if (isEqual(e, srcValue)) {

            }
        }
        return true
    }
    function property(source) {

    }


    // no test
    function filter(collection, predicate = identity) {
    }


    function find(collection, predicate, fromIndex = 0) {
        for (let i = fromIndex; i < arr.length; i++) {
            if (predicate(arr[i])) {
                return arr[i]
            }
        }
        return undefined
    }







    function dropWhile(arr, predicate) {
        let count = 0

        if (theTypeOf(predicate) == "object") {
            predicate = matches
        } else if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty
        } else if (theTypeOf(predicate) == "string") {
            predicate = property
        }
        for (e of arr) {
            if (predicate(e)) {
                count++
            } else {
                break
            }
        }
        return drop(arr, count)



    }

    function dropRightWhile(arr, predicate) {

    }
    return {
        compact,
        chunk,
        difference,
        differenceBy,
        differenceWith,
        join,
        last,
        lastIndexOf,
        drop,
        dropRight,
        head,
        indexOf,
        initial,
        findIndex,
        findLastIndex,
        flatten,
        reverse,
        sortedIndex,
        fill,
        toArray,
        //待完成
        some,
        dropWhile,
        dropRightWhile,
        isEqual,

        // matches,
        // matchesProperty,
        // property,

        //待调试
        every,
        filter,
        find,
        concat,
        toPairs,
        fromPairs,
        flattenDeep,
        flattenDepth,
        keyBy,
        curry,
        groupBy,
        identity,
        isMatch
    }
})()


// kakapiya.chunk(['a', 'b', 'c', 'd'], 2);
// kakapiya.difference([1, 2, 3, 4, 5, 6, 7, 8], [1, 3], [4, 8], [6])
// kakapiya.join([2, 1, 2, 3], "~");
// kakapiya.lastIndexOf([1, 2, 1, 2], 2);
// kakapiya.sortedIndex([1, 2, 2, 2, 2, 3], 2);

// kakapiya.flatten([1, [2, [3, [4]], 5]])
// kakapiya.flattenDeep([1, [2, [3, [4]], 5, [6, [7, 8]]]])
// kakapiya.differenceBy([{ "x": 2 }, { "x": 1 }], [{ "x": 1 }], "x")

var object = { 'a': 1, "c": 4 };
var other = { 'a': 1, "b": 2 };
kakapiya.isEqual(object, other);

