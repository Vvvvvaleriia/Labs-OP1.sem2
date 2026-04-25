"use strict";

const timers = [];

function asyncCallbackMap(array, asyncFn, done, signal, timers) {
	const result = [];
	let complete = 0;
	let finished = false;

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
			done(new Error("Aborted"));
		}
	};

	signal?.addEventListener("abort", onAbort);

	for (let i = 0; i < array.length; i++) {
		if (finished) break;

		asyncFn(array[i], (err, res) => {
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
				done(null, result);
			}
		});
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
			asyncFn(array[i])
				.then((res) => {
					if (finished || signal?.aborted) return;

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
		const result = await promiseMap([7, 8, 9], double, stop.signal);
		console.log(result);
	} catch (err) {
		console.log("Error", err.message);
	}
}

const stop = new AbortController();

asyncCallbackMap(
	[1, 2, 3, 4],
	(x, cb) => {
		const id = setTimeout(() => cb(null, x * 2), 200);
		timers.push(id);
	},
	(err, result) => {
		if (err) {
			console.log("Error", err.message);
			return;
		}
		console.log(result);
	},
	stop.signal,
	timers,
);

setTimeout(() => {
	console.log("Aborted");
	stop.abort();
}, 300);

function double(x) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(x * 2), 500);
	});
}

promiseMap([4, 5, 6], double, stop.signal)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err.message);
	});

asyncExample();
