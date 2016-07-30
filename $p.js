function $p(fn, ...options) {
    let settings = {
        profile: {
            ignoreCompile: true,
            every: false,
            memory: false
        },
    };

    options = options.filter(option => {
        if (! option._asserts) Object.assign(settings, option);
        return !! option._asserts;
    });

    let argsNames = [];
    fn.toString().match(/\(([^)]+)\)/)[1].split(',').forEach(function(argName, index) {
        argName = argName.trim();

        if (argName.length) {
            argsNames[index] = argName;
        }
    });

    let fName = fn.name || 'anonymous';
    let orig  = fn;

    if (settings.profile) {
        let profile = {
            count: 0,
            total_time: 0,
            get time() {
                return this.total_time / this.count;
            },
            print: function() {
                function printArgs(args) {
                    return Array.prototype.slice.apply(args).join(' ,');
                }

                return `Function "${fName}" has been called ${this.count.toString()} times\n` +
                        `total calling time: ${humanTime(this.total_time, 'n').yellow}\n` +
                        `compile time: ${humanTime(this.compile_time, 'n').yellow}\n` +
                        `average calling time: ${humanTime(this.time, 'n')}\n` +
                        (this.total_memory ? `sum of memory diff: ${(this.total_memory + '').green}\n` : ``) +
                        (this.total_memory ? `average memory diff: ${(this.memory + '').blue}\n` : ``) +
                        (this.runData ? (
                            `list of every call:\n` +
                            `\tP_TIME\tHR_TIME` + (this.total_memory ? `\t\tMEMORY_CHANGE`:``) + `\n` +
                            this.runData.map(run => {
                                /*`\t ${(new Date(run.ut)).toString()}`*/
                                return `\t${humanTime(run.pt, 's')}\t${humanTime(run.ht, 'n')}\t\t${this.total_memory ? run.memory_delta : ''}` +
                                       `\t(${printArgs(run.args)}) => ${run.result}`;
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

            if (profile.count === 0) {
                profile.compile_time = (diff[0] * 1e9 + diff[1]);
            }

            if (! settings.profile.ignoreCompile || profile.count > 0) {
                profile.total_time += (diff[0] * 1e9 + diff[1]);
            }

            profile.count        += 1;

            if (settings.profile.every) {
                if (settings.profile.memory) {
                    profile.runData.push({
                        ut: now,
                        pt: pt,
                        ht: diff[0] * 1e9 + diff[1],
                        args: arguments,
                        result: result,
                        memory_delta: memoryDelta,
                        memory_before: m1,
                        memory_after: m2,
                    });
                } else {
                    profile.runData.push({
                        ut: now,
                        pt: pt,
                        ht: diff[0] * 1e9 + diff[1],
                        args: arguments,
                        result: result,
                    });
                }
            }

            return result;
        };

        fn.profile = profile;
    }

    let wrap = function() {
        let i = 0;

        for (let option of options) {
            let arg = arguments[i];

            for (let assert of option._asserts) {
                if (! assert(arg)) {
                    throw TypeError(`no passed assert "${assert.name}" for ${i} argument "${argsNames[i]}" at ${fName}`);
                }
            }

            i++;
        }

        return fn.apply(this, arguments);
    };

    if (fn.profile) {
        wrap.profile = fn.profile;
    }

    Object.defineProperty(wrap, 'name',   {value: orig.name});
    Object.defineProperty(wrap, 'length', {value: orig.length});

    return wrap;
}

function humanTime(time, unit = 's') {
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
}

$p.printTime = humanTime;

module.exports = $p;
