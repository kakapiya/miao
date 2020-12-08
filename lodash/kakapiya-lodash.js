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
        let res = new Set()
        let res1 = []

        for (let i = 0; i < arr.length; i++) {
            for (e of other) {
                if (arr[i] == e) {
                    break
                } else {
                    res.add(arr[i])
                }
            }
        }
        res.forEach(e => {
            res1.push(e)
        })
        if (res.length == 0) return []
        return res1
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

    function findIndex(arr, val, ...args) {

    }

    function findLastIndex(arr, val, ...args) {

    }

    function flatten(arr, val, ...args) {

    }

    function flattenDeep(arr, val, ...args) {

    }

    function flattenDepth(arr, val, ...args) {

    }

    function fromPairs(arr, val) {

    }

    function head() {

    }

    function indexOf() {

    }

    function initial() {

    }

    function reverse() {

    }

    function every() {

    }

    function filter() {

    }

    function find() {

    }
    function toArray() {

    }

    function sortedIndex() {

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
        //待完成
        fill,
        findIndex,
        findLastIndex,
        flatten,
        flattenDeep,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        reverse,
        sortedIndex,
        every,
        filter,
        find,
        toArray
    }
})()


//kakapiya.chunk(['a', 'b', 'c', 'd'], 2);
// kakapiya.difference([2, 1], [2, 3]);
// kakapiya.join([2, 1, 2, 3], "~");
// kakapiya.lastIndexOf([1, 2, 1, 2], 2);