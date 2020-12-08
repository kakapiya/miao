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

    //
    function difference(arr, other) {
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
        if (res) return []
        return res1
    };





    return {
        compact,
        chunk,
        difference
    }
})()


//kakapiya.chunk(['a', 'b', 'c', 'd'], 2);
kakapiya.difference([2, 1], [2, 3]);