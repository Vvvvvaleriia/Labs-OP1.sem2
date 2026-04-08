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
			return oldest.item;
		}

		if (option === "newest") {
			let newest = this.queue[0];
			for (const item of this.queue) {
				if (item.priorityIndex > newest.priorityIndex) {
					newest = item;
				}
			}
			return newest.item;
		}

		if (option === "highest") {
			let maxPriority = this.queue[0];
			for (const item of this.queue) {
				if (item.priority > maxPriority.priority) {
					maxPriority = item;
				}
			}
			return maxPriority.item;
		}

		if (option === "lowest") {
			let minPriority = this.queue[0];
			for (const item of this.queue) {
				if (item.priority < minPriority.priority) {
					minPriority = item;
				}
			}
			return minPriority.item;
		}
	}
}

const test = new biDirectionalPriorityQueue();
test.enqueue("dog", 1);
test.enqueue("cat", 4);
test.enqueue("fish", 2);

console.log(`The oldest is ${test.peek("oldest")}`);
console.log(`The newest is ${test.peek("newest")}`);
console.log(`The highest priority has ${test.peek("highest")}`);
console.log(`The lowest priority has ${test.peek("lowest")}`);

console.log(test.queue);
