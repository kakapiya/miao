/**
 * theTypeof funciton returns a string indicating the type of the unevaluated operand
 * @param {*} e
 * @return {string}
 */

function isNaN(value) {
    return value !== value
}

function theTypeOf(e) {
    if (isNaN(e)) {
        return "NaN"
    } else {
        return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "").toLowerCase()
    }
}

/**
 * Binds methods of an object to the object itself, 
 * overwriting the existing method.
 * @param {object} object
 * @param {string|string[]} methodName
 * @return {object}
 */

function bindAll(object, methodName) {
    return object.methodName = methodName
}


var view = {
    'label': 'docs',
    'click': function () {
        console.log('clicked ' + this.label);
    }
};

// bindAll(view, ['click']);
// jQuery(element).on('click', view.click);
// => Logs 'clicked docs' when clicked.

/**
 * Adds all own enumerable string keyed function properties of a source object to the destination object. 
 * If object is a function, then methods are added to its prototype as well.
 * @param {Function|Object} [object=lodash]
 * @param {Object} source 
 * @param {Object} [options={}] 
 * @param {boolean} [options.chain=true]
 * @return {*}
 */
function mixin(object = lodash, source, options = {}) {

}


/**
 * Creates a function that memoizes the result of func. 
 * If resolver is provided, it determines the cache key 
 * for storing the result based on the arguments provided to the memoized function.
 * By default, the first argument provided to the memoized function is used as the map cache key. 
 * The func is invoked with the this binding of the memoized function.
 * @param {Funciton} func 
 * @param {Function} resolver
 * @return {Funciton}
 */
function memozie(func, resolver) {

}