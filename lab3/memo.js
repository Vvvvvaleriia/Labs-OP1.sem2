"use strict";

function memoize(fn, limit) {
	const cache = new Map();
	return (...args) => {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			const newValue = cache.get(key);
			cache.delete(key);
			cache.set(key, newValue);
			return newValue;
		}

		if (cache.size >= limit) {
			const oldKey = cache.keys().next().value;
			cache.delete(oldKey);
		}
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
}
