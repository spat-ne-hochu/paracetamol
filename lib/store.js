let configs = {};
let resolved = {};

let prototypeCache = {};

let Store = {
    define: function(name, fn, chainNames) {
        configs[name] = {
            fn             : fn,
            chainNames     : chainNames
        };
    },
    factoryChainFunction: function(name) {
        return function() {
            let nextPrototype = Store.getPrototype(name);

            let asserts = this._asserts || [];

            asserts.push(configs[name].fn);

            function from(value) {
                for (let assert of asserts) {
                    if (! assert(value)) {
                        throw TypeError(`no passed assert "${assert.name}" for ${typeof value}:'${value}'`);
                    }
                }
            }

            from.for       = function(value) {
                let result = true;

                for (let assert of asserts) {
                    result = result && assert(value)
                }

                return result;
            };

            from._asserts  = asserts;
            nextPrototype.__proto__ = Function;
            from.__proto__ = nextPrototype;

            return from;
        }
    },
    setMethod: function(obj, name) {
        if (! configs[name]) {
            throw `No next chain "${name}"`;
        }

        let d       = {enumerable: true},
            fn      = configs[name].fn,
            chainFn = Store.getByName(name);

        if (fn.length > 1) {
            d.value = chainFn;
        } else {
            d.get = function() {
                return chainFn.apply(this)
            };
        }

        Object.defineProperty(obj, name, d);
    },
    getPrototype: function(name) {
        if (! prototypeCache[name]) {
            let proto = {};

            for (let chainName of configs[name].chainNames) {
                this.setMethod(proto, chainName);
            }

            prototypeCache[name] = proto;
        }

        return prototypeCache[name];
    },
    getByName: function(name) {
        if (! resolved[name]) {
            resolved[name] = this.factoryChainFunction(name);
        }

        return resolved[name];
    }
};

module.exports = Store;
