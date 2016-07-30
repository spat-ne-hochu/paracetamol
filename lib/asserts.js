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

_.isBoolean = function isBoolean(v) {
    return typeof v === 'boolean';
};

_.isNumber = function isNumber(v) {
    return typeof v === 'number';
};

_.isString = function isString(v) {
    return typeof v === 'string';
};

_.numeric = function isNumeric(v) {
    return _.isNumber(v) || _.isString(v) && ! isNaN(+v);
};

_.isSymbol = function isSymbol(v) {
    return typeof v === 'symbol';
};

_.isFunction = function isFunction(v) {
    return typeof v === 'function';
};

_.isArray = function isArray(v) {
    return Array.isArray(v);
};

_.isObject = function isObject(v) {
    return ! _.isNull() && typeof v === 'object';
};

_.isAny = function isAny(v)  {
    return _.isDefined(v) && ! _.isNull(v);
};

_.isScalar = function isScalar(v) {
    return _.isNumber(v) || _.isBoolean(v) || _.isString(v);
};

_.isComplex = function isComplex(v) {
    return _.isArray(v) || _.isObject(v) || _.isFunction();
};

_.isCountable = function isCountable(v) {
    return _.isArray(v) || _.isString();
};

_.isPositive = function isPositive(v) {
    return _.numeric(v) && v > 0;
};

_.isNegative = function isNegative(v) {
    return _.numeric(v) && v < 0;
};

_.isNotNegative = function isNotNegative(v) {
    return _.numeric(v) && v >= 0;
};

_.isNotPositive = function isNotPositive(v) {
    return _.numeric(v) && v <= 0;
};

_.isInteger = function isInteger(v) {
    return _.numeric(v) && ~~v === +v;
};

_.isFloat = function isFloat(v) {
    return ! _.isInteger(v);
};

/*function isLTE(v, than) {
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