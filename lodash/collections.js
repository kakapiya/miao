/**
* @param {string} haystack
* @param {string} needle
* @return {number}
*/

var strStr = function (haystack, needle) {
    if (needle == "") return 0;
    let next = getNextmy(needle);
    let hi = 0;
    let ne = 0;
    while (hi < haystack.length) {
        if (ne == -1 || haystack[hi] == needle[ne]) {//相等情况
            if (ne == needle.length - 1) return (hi - needle.length + 1);
            hi++;
            ne++;
        } else {//失配情况
            ne = next[ne];
        }
    }
    return -1;
};

function getNext(needle) {//获取next数组
    let next = [];
    next[0] = -1;
    let i = 0;
    let j = -1;
    while (i < needle.length) {
        if (j == -1 || needle[i] == needle[j]) {
            next[++i] = ++j;
        } else {
            j = next[j]
        }
    }
    return next;
}


//aabacaa
function getNextMy(needle) {
    let next = [-1]
    let j = -1
    for (let i = 0; i < needle.length;) {
        if (j = -1 || needle[i] == needle[j]) {
            next[++i] = ++j
        } else {
            j = 0
        }
    }
    return next
}

/**
 * Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise
 * SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end
 * of collection.
 * @param collection
 * @param value
 * @param fromIndex
 * @return {number|*}
 */

function includes(collection, value, fromIndex = 0) {
    // 不使用indexOf方法
    if (theTypeOf(collection) == "string") {
        if (fromIndex < 0) fromIndex += collection.length;
        return strStr(collection, value, fromIndex) !== -1;
    }
    if (theTypeOf(collection) == "object") {
        collection = Object.keys(collection).map(key => collection[key]);
    }
    if (fromIndex < 0) fromIndex += collection.length;
    for (let i = fromIndex; i < collection.length; i++) {
        if (sameValueZero(value, collection[i])) return true;
    }
    return false;
}


function invokeMap(collection, path) {
    
}
