function $p(fn, options) {
    let settings = {
        profile: {
            every: false,
            memory: false
        },
    };

    options = Array.prototype.slice.call(options).filter(option => {
        if (! option._validators) {
            Object.assign(settings, option);
            return false;
        } else {
            return true;
        }
    });

    if (settings.profile) {
        let orig = fn;

        let profile = {
            count: 0,
            total_time: 0,
            get time() {
                return this.total_time / this.count;
            },
            print: function() {
                return `Function "${orig.name.yellow}" has been called ${this.count.toString()} times\n` +
                        `total calling time: ${$p.humanTime(this.total_time, 'n').yellow}\n` +
                        `average calling time: ${$p.humanTime(this.time, 'n')}\n` +
                        (this.total_memory ? `sum of memory diff: ${(this.total_memory + '').green}\n` : ``) +
                        (this.total_memory ? `average memory diff: ${(this.memory + '').blue}\n` : ``) +
                        (this.runData ? (
                            `list of every call:\n` +
                            `\tP_TIME\tHR_TIME` + (this.total_memory ? `\t\tMEMORY_CHANGE`:``) + `\n` +
                            this.runData.map(run => {
                                /*`\t ${(new Date(run.ut)).toString()}`*/
                                return `\t${$p.humanTime(run.pt, 's')}\t${$p.humanTime(run.ht, 'n')}\t\t${this.total_memory ? run.memory_delta : ''}`;
                            }).join('\n')
                        )
                        : ``);

            }
        };

        if (settings.profile.memory) {
            profile.total_memory = 0;
            Object.defineProperty(profile, 'memory', {get: function() {
                return this.total_memory / this.count;
            }, enumerable: true});
        }

        if (settings.profile.every) {
            profile.runData = [];
        }

        fn = function() {
            if (settings.profile.memory) {
                var m1 = process.memoryUsage().heapUsed;
            }
            let now = Date.now();
            let pt = process.cpuUsage().user / 1e6;

            let start  = process.hrtime();

            let result = orig.apply(this, arguments);

            let diff = process.hrtime(start);

            if (settings.profile.memory) {
                var m2 = process.memoryUsage().heapUsed;
                var memoryDelta = m2 - m1;
                profile.total_memory += memoryDelta;
            }


            profile.count        += 1;
            profile.total_time   += diff[0] * 1e9 + diff[1];

            if (settings.profile.every) {
                if (settings.profile.memory) {
                    profile.runData.push({
                        ut: now,
                        pt: pt,
                        ht: diff[0] * 1e9 + diff[1],
                        memory_delta: memoryDelta,
                        memory_before: m1,
                        memory_after: m2,
                    });
                } else {
                    profile.runData.push({
                        ut: now,
                        pt: pt,
                        ht: diff[0] * 1e9 + diff[1]
                    });
                }
            }

            return result;
        };

        Object.defineProperty(fn, 'name', {value: 'with-profiling__' + orig.name});

        fn.profile = profile;
    }

    let wrap = function() {
        let i = 0;

        for (let option of options) {
            let arg = arguments[i];

            for (let validator of option._validators) {
                if (! validator(arg)) {
                    throw TypeError(`no passed ${validator} for ${i} argument at ${fn.name}`);
                }
            }

            i++;
        }

        return fn.apply(this, arguments);
    };

    if (fn.profile) {
        wrap.profile = fn.profile;
    }

    Object.defineProperty(wrap, 'name', {value: '$p__' + fn.name});

    return wrap;
}

Function.prototype.$p = function() {
    return $p(this, arguments);
};

function isNumber(value) {
    return typeof value === 'number';
}

function isPositive(value) {
    return value > 0;
}

function isString(value) {
    return typeof value === 'string';
}

function stringMinLength(string, length) {
    return string.length >= length;
}

function stringMaxLength(string, length) {
    return string.length <= length;
}

function getCxt() {
    let ctx;

    if (! this._validators) {
        ctx = {
            _validators: []
        }
    } else {
        ctx = this;
    }

    return ctx;
}

$p.humanTime = function(time, unit = 's') {
    let colors = require('colors');

    switch (unit) {
        case 's':
            time = time * 1e9;
            break;
        case 'm':
            time = time * 1e6;
            break;
        case 'u':
            time = time * 1e3;
            break;
        case 'n':
            time = time * 1e0;
            break;
    }

    switch (true) {
        case time < 1e3:
            return (time + 'ns').blue;
        case time < 1e6:
            return (~~(time/1e3) + 'us').green;
        case time < 1e9:
            return (~~(time/1e6) + 'ms').yellow;
        default:
            return (~~(time/1e9) + 's').red;
    }
};

$p.isNumber = function() {
    let ctx = getCxt.apply(this);

    ctx._validators.push(isNumber);
    ctx.isPositive = $p.isPositive;

    return ctx;
};

$p.isPositive = function() {
    let ctx = getCxt.apply(this);

    ctx._validators.push(isPositive);

    return ctx;
};

$p.isString = function() {
    let ctx = getCxt.apply(this);

    ctx._validators.push(isString);
    ctx.min = $p.min;

    return ctx;
};

$p.min = function(length) {
    let ctx = getCxt.apply(this);

    ctx._validators.push(function $stringMinLength(value) {
        return stringMinLength(value, length);
    });

    ctx.max = $p.max;

    return ctx;
};

$p.max = function(length) {
    let ctx = getCxt.apply(this);

    ctx._validators.push(function $stringMaxLength(value) {
        return stringMaxLength(value, length);
    });

    return ctx;
};

module.exports = $p;
