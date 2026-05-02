"use strict";

async function* createUsers(numOfUsers, batchSize = 2) {
	let batch = [];

	for (let i = 1; i <= numOfUsers; i++) {
		const user = {
			name: `User: ${i}`,
		};
		batch.push(user);

		if (batch.length === batchSize) {
			yield batch;
			batch = [];
		}
	}

	if (batch.length) {
		yield batch;
	}
}
