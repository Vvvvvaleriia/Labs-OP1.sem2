"use strict";

async function* createUsers(numOfUsers, batchSize = 2) {
	let batch = [];

	for (let i = 1; i <= numOfUsers; i++) {
		const user = {
			name: `User: ${i}`,
			text: `text - ${i}`,
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

function renderUsers(user) {
	return `
		<div>
			<h3>${user.name}</h3>
			<p>${user.text}</p>

		</div>
	`;
}
