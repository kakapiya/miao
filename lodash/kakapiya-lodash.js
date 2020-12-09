var kakapiya = (function () {
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
    function find(collection, predicate, fromIndex = 0) {
        for (let i = fromIndex; i < arr.length; i++) {
            if (predicate(arr[i])) {
                return arr[i]
            }
        }
        return undefined
    }

    //no test
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
            }
            res.push(arr[i])
        }
        return res
    }

    function flattenDeep(arr) {
        //base case 
        let res = []
        let process = function () {
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    process(flatten(arr[i]))
                } else {
                    res.push(arr[i])
                }
            }
        }
        process(arr)
        return res
    }

    function flattenDepth(arr, depth = 1) {
        //base case 
        let res = []
        let process = function () {
            if (depth) {
                for (let i = 0; i < arr.length; i++) {
                    if (Array.isArray(arr[i])) {
                        process(flatten(arr[i]))
                    } else {
                        res.push(arr[i])
                    }
                }
                depth--
            }
        }
        process(arr)
        return res
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
    function filter(arr, p) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            if (p(arr[i])) {
                res.push(arr[i])
            }
        }
        return res
    }

    // no test
    function every(arr, p) {
        if (!arr) return true
        for (let i = 0; i < arr.length; i++) {
            if (p(arr[i])) {
                return true
            }
        }
        return false
    }

    function some(arr, p) {

    }

    // no test
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

    // no test
    function sortedIndex(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (val <= arr[i]) {
                return i
            }
        }
        return arr.length
    }

    function concat(arr, ...args) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            res.push(arr)
        }
        for (let i = 0; i < args.length; i++) {

            for (let j = 0; j < args[i].length; j++) {
                res.push(args[j])
            }
        }
        return res
    }

    function keyBy(collection, iteratee) {

    }

    function fromPairs(arr, val) {

    }

    function head() {

    }

    function indexOf() {

    }

    function initial() {

    }

    function curry() {

    }

    function groupBy() {

    }

    return {
        compact,
        chunk,
        difference,
        join,
        last,
        lastIndexOf,
        drop,
        dropRight,
        concat,
        //待完成
        find,
        findIndex,
        findLastIndex,
        flatten,
        flattenDeep,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        curry,
        groupBy,

        //待调试
        reverse,
        sortedIndex,
        every,
        filter,
        fill,
        toArray,
        keyBy
    }
})()


// kakapiya.chunk(['a', 'b', 'c', 'd'], 2);
// kakapiya.difference([1, 2, 3, 4, 5, 6, 7, 8], [1, 3], [4, 8], [6])
// kakapiya.join([2, 1, 2, 3], "~");
// kakapiya.lastIndexOf([1, 2, 1, 2], 2);
// kakapiya.sortedIndex([1, 2, 2, 2, 2, 3], 2);

kakapiya.findIndex([{ "user": "barney", "active": false }, { "user": "fred", "active": false }, { "user": "pebbles", "active": true }], { "user": "fred", "active": false })
