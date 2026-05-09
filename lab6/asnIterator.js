"use strict";

const userDiv = document.querySelector(".users");

async function* createUsers(numOfUsers, batchSize = 2) {
	let batch = [];

	for (let i = 1; i <= numOfUsers; i++) {
		const user = {
			name: `User: ${i}`,
		};
		batch.push(user);

		if (batch.length === batchSize) {
			await new Promise((resolve) => setTimeout(resolve, 100));
			yield batch;
			batch = [];
		}
	}

	if (batch.length) {
		await new Promise((resolve) => setTimeout(resolve, 100));
		yield batch;
	}
}

function renderUsers(user) {
	return `
		<div>
			<h3>${user.name}</h3>
		</div>
	`;
}

async function processUsers(generator) {
	for await (const batch of generator) {
		const html = batch.map(renderUsers).join("");
		userDiv.insertAdjacentHTML("beforeend", html);
	}
}

function render() {
	userDiv.innerHTML = "";

	const usersStream = createUsers(30, 3);
	processUsers(usersStream);
}
render();
