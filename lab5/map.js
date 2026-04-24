"use strict";

function asyncCallbackMap(array, asyncFn, done, signal) {
	const result = [];
	let complete = 0;

	if (signal?.aborted) return;

	for (let i = 0; i < array.length; i++) {
		asyncFn(array[i], (res) => {
			if (signal?.aborted) return;
			result[i] = res;
			complete++;

			if (complete === array.length) {
				done(result);
			}
		});
	}
}

const stop = new AbortController();

asyncCallbackMap(
	[1, 2, 3, 4, 5, 6, 7],
	(x, cb) => {
		setTimeout(() => cb(x * 2), 200);
	},
	(result) => console.log(result),
	stop.signal,
);

setTimeout(() => {
	console.log("Stop");
	stop.abort();
}, 210);

function promiseMap(array, asyncFn) {
	return Promise.all(array.map(asyncFn));
}

function double(x) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(x * 2), 500);
	});
}

promiseMap([4, 5, 6], double).then((result) => console.log(result));

async function asncExample() {
	const result = await promiseMap([7, 8, 9], double);

	console.log(result);
}

asncExample();
