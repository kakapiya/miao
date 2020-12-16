var kakapiya = (function () {
    function theTypeOf(e) {
        return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "").toLowerCase()
    }
    function maxLength(a1, a2) {
        return a1.length > a2.length ? a1.length : a2.length
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
        if (args.length == 1) {
            other = args[0]
            iteratee = args[0]
        }
        for (e of other) {
            if (theTypeOf(e) == "array" || theTypeOf(e) == "object") {
                other1.push(...e)
            } else {
                other1.push(e)
            }
        }

        //如果是字符串，就改造成函数
        if (theTypeOf(iteratee) == "string") {
            let key = iteratee
            iteratee = property(key)
        }

        if (theTypeOf(iteratee) == "function") {
            other1 = other1.map(e => iteratee(e))
            for (let i = 0; i < arr.length; i++) {
                let isInclude = other1.includes(iteratee(arr[i]))
                if (!isInclude) res.push(arr[i])
            }
            return res
        }

        if (theTypeOf(iteratee) == "array") {
            if (arguments.length > 2) other1.push.apply(other1, iteratee)
            for (let i = 0; i < arr.length; i++) {
                let isInclude = other1.includes(arr[i])
                if (!isInclude) res.push(arr[i])
            }
            return res
        }


    };


    // 找other外的数
    function differenceWith(arr, values, comparator) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < values.length; j++) {
                if (comparator(arr[i], values[j])) {
                    break
                }
                if (j == values.length - 1) {
                    //全部遍历走完，说明arr[i]不在values中
                    result.push(arr[i])
                }
            }
        }
        return result
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
        res = []
        res.push.apply(arr, ...args)
        return res
    }

    function toPairs(object) {
        if (theTypeOf(object) == "set" || theTypeOf(object) == "map") {
            return Array.from(object)
        }

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
    //参数复用
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
            //因为递归调用inner，所以最后返回的始终是函数，利用这种递归调用，变量被存在args中
            //此时将这些参数拿出来用即可
            inner.toString = function () {
                return func(...args)
            }
            //延迟调用的参数再次压入
            return inner
        }

    }

    function groupBy(collection, iteratee) {
        let res = {}
        for (let i = 0; i < collection.length; i++) {
            let key = iteratee(collection[i], i, collection)
            if (!Array.isArray(res[key])) {
                res[key] = []
            }
            res[key].push(collection[i])
        }
        return res
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
        if (theTypeOf(val) == "object") {
            if (Object.keys(val).length != Object.keys(other).length) {
                return false
            }
        }
        if (val.length !== other.length) return false

        if (theTypeOf(val) === "array") {
            for (let i = 0; i < val.length; i++) {
                if (!isEqual(val[i], other[i])) return false
            }
            return true
        }

        if (theTypeOf(val) === "object") {
            for (key in val) {
                if (!isEqual(val[key], other[key])) return false
            }
            return true
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

    //去除array前面的n个元素
    function drop(arr, n = 1) {
        if (n >= arr.length) return []
        let res = []
        for (let i = n; i < arr.length; i++) {
            res.push(arr[i])
        }
        return res
    }

    //去除array尾部的n个元素。
    function dropRight(arr, n = 1) {
        if (n >= arr.length) return []
        let res = []
        for (let i = 0; i < arr.length - n; i++) {
            res.push(arr[i])
        }
        return res
    }

    //去除array中从起点开始到 predicate 返回假值结束部分
    function dropWhile(arr, predicate = identity) {
        let count = 0
        let key = predicate
        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        } else if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        } else if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }

        for (e of arr) {
            if (predicate(e)) {
                count++
            } else {
                break
            }
        }
        //去除array中从起点开始到 predicate 返回假值结束
        return drop(arr, count)
    }

    //去除array中从 predicate 返回假值开始到尾部的部分
    function dropRightWhile(arr, predicate = identity) {
        let count = 0
        let key = predicate
        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        } else if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        } else if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }
        for (let i = arr.length - 1; i >= 0; i--) {
            if (predicate(arr[i])) {
                count++
            } else {
                break
            }
        }
        //去除array中从 predicate 返回假值开始到尾部的部分
        return arr.splice(0, arr.length - count)
    }


    // pass
    function property(path) {
        if (!Array.isArray(path)) {
            path = path.split(".")
        }
        return function (object) {
            let res = object;
            for (let i = 0; i < path.length; i++) {
                res = res[path[i]]
            }
            return res
        }
    }

    // no test
    function map(collection, iteratee = identity, res = []) {
        let key = iteratee

        //一律改造成函数
        if (theTypeOf(iteratee) == "array") {
            iteratee = matchesProperty(key)
        }
        if (theTypeOf(iteratee) == "object") {
            iteratee = matches(key)
        }
        if (theTypeOf(iteratee) == "string") {
            iteratee = property(key)
        }

        if (theTypeOf(collection) == "object") {
            for (e in collection) {
                res.push(iteratee(collection[e]))
            }
        }
        if (theTypeOf(collection) == "array") {
            for (e of collection) {
                res.push(iteratee(e))
            }
        }
        return res
    }

    // no test
    function matches(source) {
        return function (object) {
            //判断有这个属性值的对象
            //判断source的属性值和object中的属性值是否相等
            for (key in source) {
                if (!isEqual(source[key], object[key])) {
                    return false
                }
            }
            return true
        }
    }

    // no test
    //
    function matchesProperty(path, srcValue) {
        //一个参数，只有可能是类似键值对数组:['active', false]
        if (arguments.length == 1) {
            if (Array.isArray(arguments[0])) {
                srcValue = path[1]
                path = path[0]
            }
        }
        return function (object) {
            let val = property(path)(object)
            return (val == srcValue)
        }
    }

    // pass
    function filter(collection, predicate = identity) {
        let key = predicate
        //一律改造成函数
        if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        }
        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        }
        if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }

        //改造完的函数
        let predicate_final = e => {
            if (predicate(e)) {
                res.push(e)
            } else {
                return false
            }
        }
        let res_script = map(collection, predicate_final, res = [])

        let final_res = []
        for (let i = 0; i < res_script.length; i++) {
            if (res_script[i]) {
                final_res.push(res_script[i])
            }
        }
        return final_res

    }

    //[fromIndex) no test
    function find(collection, predicate, fromIndex = 0, res) {
        let key = predicate
        let index = -fromIndex

        if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        }

        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        }

        if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }

        if (theTypeOf(collection) == "object") {
            for (e in collection) {
                if (predicate(collection[e]) && index >= 0) {
                    res = collection[e]
                    break
                } else {
                    index++
                }
            }
        }
        if (theTypeOf(collection) == "array") {
            for (e of collection) {
                if (predicate(e) && index >= 0) {
                    res = e
                    break
                } else {
                    index++
                }
            }
        }
        return res
    }

    //非引用类型交集
    //无重复元素
    function intersection(...arrays) {
        let res = []
        //假设第一个数组就是交集
        let nums = {}
        arrays[0].forEach(e => {
            nums[e] = 1
        })
        for (let i = 1; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                //不在第一个数组里
                if (nums[arrays[i][j]]) {
                    nums[arrays[i][j]]++
                }
            }
        }
        //计数小于数组长度则非交集
        for (k in nums) {
            if (nums[k] == arrays.length) {
                res.push(+k)
            }
        }
        return res
    }

    function intersectionBy(arrays, iteratee = identity) {
        let res = []
        //假设第一个数组就是交集
        let nums = {}
        arguments = Array.from(arguments)
        arrays = arguments.slice(0, arguments.length - 1)
        iteratee = arguments.slice(-1)[0]
        if (theTypeOf(iteratee) == "string") {
            iteratee = property(iteratee)
        }
        arrays[0].forEach(e => {
            nums[iteratee(e)] = 1
        })
        //预期：1增加
        for (let i = 1; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                //不在第一个数组里
                if (nums[iteratee(arrays[i][j])]) {
                    nums[iteratee(arrays[i][j])]++
                }
            }
        }
        //计数小于数组长度则非交集
        for (k of arrays[0]) {
            if (theTypeOf(k) == "object") {
                if (nums[iteratee(k)] == arrays.length) {
                    res.push(k)
                }
            } else if (nums[iteratee(+k)] == arrays.length) {
                res.push(+k)
            }
        }
        return res
    }

    function intersectionWith(arr, arrs, comparator) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            let itemA = arr[i]
            for (let j = 0; j < arrs.length; j++) {
                let itemB = arrs[j]
                if (comparator(itemA, itemB) && !res.includes(itemA)) {
                    res.push(itemA)
                }
            }
        }
        return res
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        if (!array.length) return -1;
        if (fromIndex < 0) {
            fromIndex = array.length + fromIndex;
        }
        for (let i = fromIndex; i >= 0; i--) {
            if (array[i] == value) {
                return i
            }
        }
        return -1
    }
    //获取array数组的第n个元素
    function nth(array, n = 0) {
        let index = n > 0 ? n : array.length + n
        return array[index]
    }

    //移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组
    function remove(array, predicate = identity) {
        let s = 0;
        let res = []
        for (let f = 0; f < array.length; f++) {
            if (!predicate(array[f], f, array)) {
                array[s++] = array[f]
            } else {
                res.push(array[f])
            }
        }
        array.length = s
        return res
    }

    //创建一个剔除所有给定值的新数组，剔除值的时候，使用SameValueZero做相等比较。
    function without(array, ...values) {
        let res = []

        for (let i = 0; i < array.length; i++) {
            if (!values.includes(array[i])) {
                res.push(array[i])
            }
        }
        return res
    }


    // /移除数组array中所有和给定值相等的元素，使用SameValueZero【0/-0 不区分】进行全等比较。
    function pull(array, ...values) {
        let s = 0;
        for (let f = 0; f < array.length; f++) {
            if (!values.includes(array[f])) {
                array[s++] = array[f]
            }
        }
        array.length = s
        return array
    }

    function pullAll(array, values) {
        let s = 0;
        for (let f = 0; f < array.length; f++) {
            if (!values.includes(array[f])) {
                array[s++] = array[f]
            }
        }
        array.length = s
        return array

    }

    function pullAllBy(array, values, iteratee = identity) {
        let s = 0;

        let key = iteratee
        if (theTypeOf(iteratee) == "object") {
            iteratee = matches(key)
        } else if (theTypeOf(iteratee) == "array") {
            iteratee = matchesProperty(key)
        } else if (theTypeOf(iteratee) == "string") {
            iteratee = property(key)
        }
        let values_plus = values.map(e => {
            return iteratee(e)
        })
        for (let f = 0; f < array.length; f++) {
            if (!values_plus.includes(iteratee(array[f]))) {
                array[s++] = array[f]
            }
        }
        array.length = s

        return array

    }

    function pullAllWith(array, values, comparator) {
        let s = 0;
        for (let f = 0; f < array.length; f++) {
            for (let i = 0; i < values.length; i++) {
                if (!comparator(array[f], values[i])) {
                    array[s++] = array[f]
                }
            }
        }
        array.length = s

        return array

    }
    //获取除了array数组第一个元素以外的全部元素。
    function tail(array) {
        return array.slice(1, array.length)
    }

    function take(array, n = 1) {
        return array.slice(0, n)
    }

    function takeRight(array, n = 1) {
        if(n>array.length) return array
        return array.slice(array.length - n, array.length)
    }

    //到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。
    function takeRightWhile(array, predicate = identity) {

        let key = predicate
        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        } else if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        } else if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }

        for (let i = array.length - 1; i >= 0; i--) {
            if (!predicate(array[i], i, array)) {
                if (i + 1 == array.length) return []
                return array.slice(i + 1, array.length)
            }
        }
        return array
    }

    function takeWhile(array, predicate = identity) {

        let key = predicate
        if (theTypeOf(predicate) == "object") {
            predicate = matches(key)
        } else if (theTypeOf(predicate) == "array") {
            predicate = matchesProperty(key)
        } else if (theTypeOf(predicate) == "string") {
            predicate = property(key)
        }

        for (let i = 0; i < array.length; i++) {
            if (!predicate(array[i], i, array)) {
                return array.slice(0, i)
            }
        }
        return array

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
        property,
        matches,
        matchesProperty,
        property,
        isEqual,
        filter,
        find,
        fromPairs,
        flattenDeep,
        flattenDepth,
        identity,
        isMatch,
        differenceBy,
        every,
        differenceWith,
        dropWhile,
        dropRightWhile,
        intersection,
        intersectionBy,
        intersectionWith,
        nth,
        pull,
        pullAll,
        pullAllBy,
        pullAllWith,
        //待调试
        keyBy,
        groupBy,
        some,
        concat,
        curry,
        //等待结果
        tail,
        take,
        takeRight,
        takeRightWhile,
        takeWhile,

        //暂时放弃
        toPairs,
        // keys,
        // values,

    }
})()

var users = [
    { 'user': 'barney', 'active': true },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': false }
];



let res = kakapiya.takeRight([1,2,3],5)
