var kakapiya = (function () {


    function chunk(arr, size = 1) {
        let res = []
        let count = 0

        for (let j = 0; j < arr.length; j += size) {
            let e_arr = []
            for (let i = j; i < j + size; i++) {
                e_arr.push(arr[i])
                count++
            }
            res.push(e_arr)
        }
        let e_arr = []
        for (let i = count; i < arr.length; i++) {
            e_arr.push(arr[i])
        }
        res.push(e_arr)
        return res
    }

    function compact(arr) {
        let res = []
        for (e of arr) {
            if (e) res.push(e)
        }
        return res
    }

    return {
        compact,
        chunk
    }
})()
