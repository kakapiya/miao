function theTypeOf(e) {
    if (typeof e == "number") return "number"
    if (typeof e == "string") return "string"
    if (typeof e == "function") return "function"
    if (Array.isArray(e)) return "array"
    if (typeof e == "object") return "object"
}
function identity(...args) {
    return args[0]
}

function property() {

}

function matches() {

}

function matchesProperty() {

}


function filter(collection, predicate = identity) {
    let res = []

    if (theTypeOf(predicate) == "array") {
        predicate = matchesProperty
    }


    if (theTypeOf(predicate) == "object") {
        predicate = matches
    }

    if (theTypeOf(predicate) == "string") {
        predicate = property
    }

    if (theTypeOf(collection) == "object") {
        for (e in collection) {
            if (predicate(e)) {
                res.push(e)
            }
        }
    }
    if (theTypeOf(collection) == "array") {
        for (e of collection) {
            if (predicate(e)) {
                res.push(e)
            }
        }
    }
    return res
}


var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false }
];


filter(users, function (o) { return !o.active; });