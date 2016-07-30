const $p = require('../index');

let fn = function(a, b, c) {
    let i = 1e6;
    while (--i);
    return Math.pow(a, b * c);
};

fn = $p(fn, $p.Number, $p.Number, $p.Number, {
    profile: true
});

let start  = process.hrtime();

for (let i = 0; i < 16; ++i) {
    fn(2, i, i+1);
}

let diff     = process.hrtime(start);
let spending = diff[0] * 1e9 + diff[1] - fn.profile.total_time;

console.log('Profiling time spending:', $p.printTime(spending, 'n'));
console.log();
console.log(fn.profile.print());