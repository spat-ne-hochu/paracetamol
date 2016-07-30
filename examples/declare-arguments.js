const $p = require('../index');

let fn = function functionName(number, string) {
    return string + '(' + number + ')';
};

// Declare arguments type / wrap myFunction
fn = $p(fn, $p.Number, $p.String);

// Proxy function name and arguments count
console.log(fn.name, fn.length);

// Success call
console.log(fn(1, 'one'));

// throw TypeError for {number} argument
//fn('one', 'one');

// throw TypeError for {string} argument
//fn(1, 1);