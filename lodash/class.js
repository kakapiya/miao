//vector
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (othVector) {
    return new Vector(this.x + othVector.x, this.y + othVector.y)
}

Vector.prototype.minus = function (othVector) {
    return new Vector(this.x - othVector.x, this.y - othVector.y)
}



Object.defineProperty(Vector.prototype, "length", {
    get: function length() {
        return Math.sqrt(this.y ** 2 + this.x ** 2)
    }
})

//complex
function Complex(x, y) {
    this.real = x;
    this.imag = y;
}


Complex.prototype.plus = function (othVector) {
    return new Complex(this.real + othVector.real, this.imag + othVector.imag)
}

Complex.prototype.minus = function (othVector) {

    return new Complex(this.real - othVector.real, this.imag - othVector.imag)
}

Complex.prototype.multiple = function (othVector) {

    let real = othVector.real * this.real + othVector.imag * this.imag * -1
    let imag = othVector.imag * this.real + othVector.real * this.imag
    return new Complex(real, imag)
}

Complex.prototype.division = function (othVector) {
    let minus_oth = new Complex(othVector.real, -othVector.imag)
    let s = minus_oth.multiple(this)
    let m = minus_oth.multiple(othVector)
    if (m.imag == 0) return new Complex(s.real / m.real | 0, 0)
    return new Complex(s.real / m.real | 0, s.imag / m.imag)
}

Complex.prototype.toString = function () {

    if (this.imag < 0) {
        return this.real + "" + this.imag + "i"

    } else if (this.imag == 0) {
        return this.real + ""

    } else {
        return this.real + "+" + this.imag + "i"

    }
}

var a = new Complex(5, 3)
var b = new Complex(3, -2)
var c = a.minus(b)
var d = a.plus(b)
var e = d.multiple(c)
var f = e.division(a)
let res = f.toString()