"use strict";

const userDiv = document.querySelector(".users");

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

async function processUsers(generator) {
	for await (const batch of generator) {
		const html = batch.map(renderUsers).join("");
		userDiv.insertAdjacentHTML("beforeend", html);
	}
}

function render() {
	userDiv.innerHTML = "";

	const usersStream = createUsers(15, 2);
	processUsers(usersStream);
}
render();
