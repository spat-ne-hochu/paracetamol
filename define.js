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
 * @typedef {(ChainObject|{int, float, positive, negative})} Number
 */
Store.define('Number',  _.isNumber, ['int', 'float', 'positive', 'negative']);

/**
 * @typedef {(ChainObject|{int, float, positive, negative})} String
 */
Store.define('String',  _.isString, ['int', 'float', 'positive', 'negative']);

/**
 * @typedef {(ChainObject|{int, float, positive, negative})} Numeric
 */
Store.define('Numeric', _.numeric, ['int', 'float', 'positive', 'negative']);

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

/**
 * @typedef {(ChainObject|{int, float})} positive
 */
Store.define('positive',  _.isPositive, ['int', 'float']);

/**
 * @typedef {(ChainObject|{int, float})} negative
 */
Store.define('negative',  _.isNegative, ['int', 'float']);

/**
 * @typedef {(ChainObject|{positive, negative})} int
 */
Store.define('int',  _.isInteger, ['positive', 'negative']);

/**
 * @typedef {(ChainObject|{positive, negative})} float
 */
Store.define('float',  _.isFloat, ['positive', 'negative']);

