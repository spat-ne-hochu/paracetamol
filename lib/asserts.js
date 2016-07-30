let _ = {};

_.isUndefined = function isUndefined(v) {
    return typeof v === 'undefined';
};

_.isDefined = function isDefined(v) {
    return typeof v !== 'undefined';
};

_.isNull = function isNull(v) {
    return v === null;
};

_.isBoolean = function(v) {
    return typeof v === 'boolean';
};

_.isNumber = function isNumber(v) {
    return typeof v === 'number';
};

_.isString = function(v) {
    return typeof v === 'string';
};

_.numeric = function(v) {
    return _.isNumber(v) || _.isString(v) && ! isNaN(+v);
};

_.isSymbol = function(v) {
    return typeof v === 'symbol';
};

_.isFunction = function(v) {
    return typeof v === 'function';
};

_.isArray = function(v) {
    return Array.isArray(v);
};

_.isObject = function(v) {
    return ! _.isNull() && typeof v === 'object';
};

_.isAny = function(v) {
    return _.isDefined(v) && ! _.isNull(v);
};

_.isScalar = function(v) {
    return _.isNumber(v) || _.isBoolean(v) || _.isString(v);
};

_.isComplex = function(v) {
    return _.isArray(v) || _.isObject(v) || _.isFunction();
};

_.isCountable = function(v) {
    return _.isArray(v) || _.isString();
};

/*function isPositive(v) {
    return isNumber(v) && v > 0;
}

function isNegative(v) {
    return isNumber(v) && v < 0;
}

function isNotNegative(v) {
    return isNumber(v) && v >= 0;
}

function isNotPositive(v) {
    return isNumber(v) && v <= 0;
}

function isLTE(v, than) {
    return isNumber(v) && v <= than;
}

function isLT(v, than) {
    return isNumber(v) && v < than;
}

function isGTE(v, than) {
    return isNumber(v) && v >= than;
}

function isGT(v, than) {
    return isNumber(v) && v > than;
}

function numberIsBetween(v, min, max) {
    return isNumber(v) && v > min && v < max;
}

function numberIsBetweenEqual(v, min, max) {
    return isNumber(v) && v >= min && v <= max;
}

function isInteger(v) {
    return isNumber() && ~~v === v;
}

function isFloat(v) {
    return ! isInteger(v);
}

function isEven(v) {
    return isNumber(v) && v % 2 === 0;
}

function isOdd(v) {
    return isNumber(v) && v % 2 === 1;
}

function isMultiple(v, multiple) {
    return isNumber(v) && v % multiple === 0;
}

function isFinite(v) {
    return isNumber(v) && v > -Infinity && v < Infinity && ! isNaN(v);
}

function isCountable(v) {
    return isString() || isArray();
}

function isCountLTE(v, than) {
    return isCountable(v) && v.length <= than;
}

function isCountLT(v, than) {
    return isCountable(v) && v.length < than;
}

function isCountGTE(v, than) {
    return isCountable(v) && v.length >= than;
}

function isCountGT(v, than) {
    return isCountable(v) && v.length > than;
}

function begins(v, than) {
    return isString(v) && v.indexOf(than) === 0;
}

function ends(v, than) {
    return isString(v) && v.slice(-than.length) === than;
}

function allow(v, chars) {
    if (! isString(v)) return false;
}

function contains(v, what) {
    return isCountable(v) && v.indexOf(what) !== -1
}

function test(v, reg) {
    return isString(v) && v.test(reg);
}

function has(v, field) {
    let fields = isString(field) ? [field] : field;

    return isObject(v) && isArray(fields) && fields.every(f => v.hasOwnProperty(f));
}

function notHas(v, field) {
    return !has(v, field);
}

function ping(v, field) {
    let fields = isString(field) ? [field] : field;

    return isObject(v) && isArray(fields) && fields.every(f => f in v);
}*/

module.exports = _;