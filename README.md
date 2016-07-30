### Version
Current pre-alpha 0.7.1
**Release is pre-alpha**

### Install
```bash
> npm i -S paracetamol
```

### About
Declarative checking arguments in your function.
Possible wrap and runtime syntax
Added function profiling

#### You need any function where should be strong-type arguments
```javascript
let fn = function functionName(number, string) {
    return string + '(' + number + ')';
};
```

#### Variant A: Declare and wrap

##### 1.Declare arguments and wrap your function
```javascript
fn = $p(
    fn,
    $p.Number, // asserts for 0 argument 
    $p.String  // asserts for 1 argument
);
```

##### 2. Call it
```javascript
// Normal run
fn(1, 'one');
fn(2, 'two');
fn(3, 'three');

// Throw TypeError
fn(1, []);
fn({}, 1);
fn(null, function(){});
```

#### Variant B. RunTime assert
```javascript
let fn = function functionName(number, string) {
    $p.Number(number);
    $p.String(string);

    return string + '(' + number + ')';
};
```

#### Variant C. RunTime no throw assert
```javascript
let fn = function functionName(number, string) {
    if (
        $p.Number.for(number) && 
        $p.String.for(string)
    ) {
        return string + '(' + number + ')';
    } else {
        return null;
    }
};
```

### Function Time, Memory, Result profiling
it possible only wrap syntax:
```javascript
let fn = function(a, b, c) {
    return Math.pow(a, b * c);
};

fn = $p(fn, $p.Number, $p.Number, $p.Number, {
    profile: {
        // profile memory change, default false
        memory        : true,
        
        // average/total time without first calling (VM jit compile), default true
        ignoreCompile : true, 
        
        // store all call event (Attention use, it is slow and need many memory), default false
        every         : true  
    }
});

for (let i = 0; i < 16; ++i) {
    fn(2, i, i+1);
}

console.log(fn.profile.print());
```

##### Result:
```bash
Function "anonymous" has been called 16 times
total calling time: 70us
compile time: 44us
average calling time: 4us
sum of memory diff: 18920
average memory diff: 1182.5
list of every call:
    P_TIME  HR_TIME  MEMORY_CHANGE  ARGS => RESULT
    52ms    44us     5696           (2 ,0 ,1) => 1
    52ms    56us     4072           (2 ,1 ,2) => 4
    52ms    1us      680            (2 ,2 ,3) => 64
    52ms    998ns    1656           (2 ,3 ,4) => 4096
    52ms    1us      568            (2 ,4 ,5) => 1048576
    52ms    964ns    568            (2 ,5 ,6) => 1073741824
    52ms    952ns    568            (2 ,6 ,7) => 4398046511104
    52ms    1us      568            (2 ,7 ,8) => 72057594037927940
    52ms    989ns    568            (2 ,8 ,9) => 4.722366482869645e+21
    52ms    975ns    568            (2 ,9 ,10) => 1.2379400392853803e+27
    52ms    920ns    568            (2 ,10 ,11) => 1.298074214633707e+33
    52ms    834ns    568            (2 ,11 ,12) => 5.444517870735016e+39
    52ms    832ns    568            (2 ,12 ,13) => 9.134385233318143e+46
    52ms    823ns    568            (2 ,13 ,14) => 6.129982163463556e+54
    52ms    815ns    568            (2 ,14 ,15) => 1.645504557321206e+63
    52ms    812ns    568            (2 ,15 ,16) => 1.7668470647783843e+72
```


