/*
返回如下值：
{
    a: ['b','c','d'],
    b: true
}
 */

var str = 'a=b&a=c&a=d&b=true'
function parseQueryString(str) {
    let items = str.split("&")
    let res = {}
    for (let i = 0; i < items.length; i++) {
        let item = items[i].split("=")
        let [key, value] = [item[0], item[1]]
        if (!res[key]) {
            res[key] = value
        } else {
            if (res[key].length == 1) {
                let temp = res[key]
                res[key] = [temp, value]
            } else {
                res[key].push(value)
            }
        }
    }
    return res
}

let res = parseQueryString(str)

