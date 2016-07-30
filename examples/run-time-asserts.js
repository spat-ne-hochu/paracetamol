const $p = require('../index');

let fn = function functionName(number, string) {
    $p.Number(number);
    $p.String(string);

    return string + '(' + number + ')';
};

// Success call
console.log(fn(1, 'one'));

// throw TypeError for {number} argument
//fn('one', 'one');

// throw TypeError for {string} argument
//fn(1, 1);