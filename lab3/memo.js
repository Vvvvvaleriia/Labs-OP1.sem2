"use strict";

function memoize(fn, options = {}) {
	const {
		limit = Infinity,
		strategy = "LRU",
		timeToLive = 0,
		customFn = null,
	} = options;

	const cache = new Map();

	function cutCache() {
		if (cache.size < limit) return;

		if (strategy === "LRU") {
			const oldKey = cache.keys().next().value;
			cache.delete(oldKey);
		} else if (strategy === "LFU") {
			let minCount = Infinity;
			let keyToDelete = null;

			for (const [key, value] of cache) {
				if (value.count < minCount) {
					minCount = value.count;
					keyToDelete = key;
				}
			}
			if (keyToDelete !== null) cache.delete(keyToDelete);
		} else if (strategy === "TTL") {
			const now = Date.now();
			for (const [key, value] of cache) {
				if (now - value.timestamp >= timeToLive) cache.delete(key);
			}
		} else if (strategy === "CUSTOM" && typeof customFn === "function") {
			const keyToDelete = customFn(cache);
			if (keyToDelete) cache.delete(keyToDelete);
		}
	}

	return (...args) => {
		const key = JSON.stringify(args);
		const now = Date.now();

		if (cache.has(key)) {
			const value = cache.get(key);
			value.count++;
			value.timestamp = now;

			if (strategy === "LRU") {
				cache.delete(key);
				cache.set(key, value);
			}
			return value.value;
		}

		const result = fn(...args);
		cache.set(key, { value: result, count: 1, timestamp: now });

		cutCache();

		return result;
	};
}

function sum(a, b) {
	console.log("Add sum");
	return a + b;
}

const memoAdd = memoize(sum, { limit: 3, strategy: "LRU" });
console.log(memoAdd(2, 3));
console.log(memoAdd(2, 3));
