"use strict";

function asyncCallbackMap(array, asyncFn, done, signal) {
	const result = [];
	let complete = 0;
	let finished = false;
	let timers = [];

	if (signal?.aborted) {
		finished = true;
		done(new Error("Aborted"));
		return;
	}

	const onAbort = () => {
		if (!finished) {
			finished = true;
			signal?.removeEventListener("abort", onAbort);
			timers.forEach(clearTimeout);
			timers.length = 0;
			done(new Error("Aborted"));
		}
	};

	signal?.addEventListener("abort", onAbort);

	for (let i = 0; i < array.length; i++) {
		if (finished) break;

		asyncFn(
			array[i],
			(err, res) => {
				if (finished) return;

				if (err) {
					finished = true;
					signal?.removeEventListener("abort", onAbort);
					done(err);
					return;
				}

				result[i] = res;
				complete++;

				if (complete === array.length) {
					finished = true;
					signal?.removeEventListener("abort", onAbort);
					timers.forEach(clearTimeout);
					timers.length = 0;
					done(null, result);
				}
			},
			timers,
		);
	}
}

function promiseMap(array, asyncFn, signal) {
	return new Promise((resolve, reject) => {
		const result = [];
		let complete = 0;
		let finished = false;

		if (signal?.aborted) {
			return reject(new Error("Aborted"));
		}

		const onAbort = () => {
			if (!finished) {
				finished = true;
				signal?.removeEventListener("abort", onAbort);
				reject(new Error("Aborted"));
			}
		};

		signal?.addEventListener("abort", onAbort);

		for (let i = 0; i < array.length; i++) {
			asyncFn(array[i], signal)
				.then((res) => {
					if (finished) return;

					result[i] = res;
					complete++;

					if (complete === array.length) {
						finished = true;
						signal?.removeEventListener("abort", onAbort);
						resolve(result);
					}
				})
				.catch((err) => {
					if (!finished) {
						finished = true;
						signal?.removeEventListener("abort", onAbort);
						reject(err);
					}
				});
		}
	});
}

async function asyncExample() {
	try {
		const result = await promiseMap([7, 8, 9], double, stopExample.signal);
		console.log(result);
	} catch (err) {
		console.log("Async Error", err.message);
	}
}

const stopCallbackMap = new AbortController();
const stopPromiseMap = new AbortController();
const stopExample = new AbortController();

asyncCallbackMap(
	[1, 2, 3, 4],
	(x, cb, timers) => {
		const id = setTimeout(() => cb(null, x * 2), 200);
		timers.push(id);
	},
	(err, result) => {
		if (err) {
			console.log("Callback Error", err.message);
			return;
		}
		console.log(result);
	},
	stopCallbackMap.signal,
);

setTimeout(() => {
	console.log("Aborted callbackMap");
	stopCallbackMap.abort();
}, 300);

setTimeout(() => {
	console.log("Abort promiseMap");
	stopPromiseMap.abort();
}, 350);

setTimeout(() => {
	console.log("Abort asyncExample");
	stopExample.abort();
}, 400);

function double(x, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			clearTimeout(id);
			reject(new Error("Aborted"));
			return;
		}

		const id = setTimeout(() => resolve(x * 2), 500);

		const onAbort = () => {
			clearTimeout(id);
			reject(new Error("Aborted"));
		};

		signal?.addEventListener("abort", onAbort, { once: true });
	});
}

promiseMap([4, 5, 6], double, stopPromiseMap.signal)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log("Promise Error", err.message);
	});

asyncExample();
