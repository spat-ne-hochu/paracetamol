/**
 *  @module
 */

let
    $p      = require('./$p'),
    Store   = require('./lib/store'),
    define  = require('./define');

/** @typedef {ChainObject} $p.Defined */
Store.setMethod($p, 'Defined');

/** @typedef {ChainObject} $p.Undef */
Store.setMethod($p, 'Undef');

/** @typedef {ChainObject} $p.Bool */
Store.setMethod($p, 'Bool');

/** @typedef {ChainObject} $p.Number */
Store.setMethod($p, 'Number');

/** @typedef {ChainObject} $p.String */
Store.setMethod($p, 'String');

/** @typedef {ChainObject} $p.Numeric */
Store.setMethod($p, 'Numeric');

/** @typedef {ChainObject} $p.Symbol */
Store.setMethod($p, 'Symbol');

/** @typedef {ChainObject} $p.Function */
Store.setMethod($p, 'Function');

/** @typedef {ChainObject} $p.Array */
Store.setMethod($p, 'Array');

/** @typedef {ChainObject} $p.Object */
Store.setMethod($p, 'Object');

/** @typedef {ChainObject} $p.Any */
Store.setMethod($p, 'Any');

/** @typedef {ChainObject} $p.Scalar */
Store.setMethod($p, 'Scalar');

/** @typedef {ChainObject} $p.Complex */
Store.setMethod($p, 'Complex');

/** @typedef {ChainObject} $p.Countable */
Store.setMethod($p, 'Countable');

module.exports = $p;
