class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (this.events[event]) {
			this.events[event].push(listener);
		} else {
			this.events[event] = [listener];
		}
	}

	off(event, listener) {
		this.events[event] = this.events[event].filter((l) => l !== listener);
	}

	emit(event, ...data) {
		for (const listener of this.events[event]) {
			listener(...data);
		}
	}
}

function greeting(name) {
	console.log(`Hello ${name}`);
}

function authoriz(name, yearOfBirth) {
	console.log(`Your password is ${name}${yearOfBirth}`);
}

function logged() {
	console.log("Now you are logged");
}

const events = new EventEmitter();

events.on("Authorization", greeting);
events.on("Authorization", authoriz);
events.on("Authorization", logged);

events.emit("Authorization", "Valeriia", "2008");

console.log("----------------------");
events.off("Authorization", logged);
events.emit("Authorization", "Valeriia", "2008");
