"use strict";

function asyncCallbackMap(array, asyncFn, done) {
	const result = [];
	let complete = 0;

	for (let i = 0; i < array.length; i++) {
		asyncFn(array[i], (res) => {
			result[i] = res;
			complete++;

			if (complete === array.length) {
				done(result);
			}
		});
	}
}

asyncCallbackMap(
	[1, 2, 3],
	(x, cb) => {
		setTimeout(() => cb(x * 2), 500);
	},
	(result) => console.log(result),
);
