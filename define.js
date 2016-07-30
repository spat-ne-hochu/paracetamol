let _       = require('./lib/asserts'),
    Store   = require('./lib/store');

/**
 * @typedef {Function} ThrowFn
 * @param   {*} mixed argument for check
 */

/**
 * 
 * @typedef {Function} CheckFn
 * @param   {*} mixed argument for check
 * @return  {Boolean}
 */

/**
 * @typedef {(Object|Function)} ChainObject
 * @property {CheckFn} for
 */


/**
 * @typedef {ChainObject} Defined
 */
Store.define('Defined', _.isDefined, []);

/**
 * @typedef {ChainObject} Undef
 */
Store.define('Undef', _.isUndefined, []);

/**
 * @typedef {ChainObject} Number
 */
Store.define('Number',  _.isNumber, []);

/**
 * @typedef {ChainObject} String
 */
Store.define('String',  _.isString, []);

/**
 * @typedef {ChainObject} Numeric
 */
Store.define('Numeric', _.numeric, []);

/**
 * @typedef {ChainObject} Symbol
 */
Store.define('Symbol',  _.isSymbol, []);

/**
 * @typedef {ChainObject} Bool
 */
Store.define('Bool',  _.isBoolean, []);

/**
 * @typedef {ChainObject} Array
 */
Store.define('Array',  _.isArray, []);

/**
 * @typedef {ChainObject} Object
 */
Store.define('Object',  _.isObject, []);

/**
 * @typedef {ChainObject} Function
 */
Store.define('Function',  _.isFunction, []);

/**
 * @typedef {ChainObject} Any
 */
Store.define('Any',  _.isAny, []);

/**
 * @typedef {ChainObject} Scalar
 */
Store.define('Scalar',  _.isScalar, []);

/**
 * @typedef {ChainObject} Complex
 */
Store.define('Complex',  _.isComplex, []);

/**
 * @typedef {ChainObject} Countable
 */
Store.define('Countable',  _.isCountable, []);

