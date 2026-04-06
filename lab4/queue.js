"use strict";

class biDirectionalPriorityQueue {
	constructor() {
		this.queue = [];
		this.queueCounter = 0;
	}

	enqueue(item, priority) {
		this.queue.push({
			item,
			priority,
			priorityIndex: this.queueCounter,
		});

		this.queueCounter++;
	}

	peek(option) {
		if (this.queue.length === 0) return null;

		if (option === "oldest") {
			let oldest = this.queue[0];
			for (const item of this.queue) {
				if (item.priorityIndex < oldest.priorityIndex) {
					oldest = item;
				}
			}
			return oldest;
		}

		if (option === "newest") {
			let newest = this.queue[0];
			for (const item of this.queue) {
				if (item.priorityIndex > newest.priorityIndex) {
					newest = item;
				}
			}
			return newest;
		}
	}
}

const test = new biDirectionalPriorityQueue();
test.enqueue("dog", 1);
test.enqueue("cat", 4);
test.enqueue("fish", 2);

console.log(test.peek("oldest"));
console.log(test.peek("newest"));

console.log(test.queue);
