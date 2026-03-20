'use strict'

function memoize(fn){
    const cache = Object.create(null);
    return (...args) => {
        const key = args.join(',');

        if (key in cache) return cache[key];

        const result = fn(...args);
        cache[key] = result;
        return result;
        }
    }