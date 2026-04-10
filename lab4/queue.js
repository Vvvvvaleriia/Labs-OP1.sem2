"use strict";

class BiDirectionalPriorityQueue {
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

	dequeue(option) {
		if (this.queue.length === 0) return null;

		if (option === "oldest") {
			let oldest = this.queue[0];
			for (const item of this.queue) {
				if (item.priorityIndex < oldest.priorityIndex) {
					oldest = item;
				}
			}
			let index = this.queue.indexOf(oldest);
			this.queue.splice(index, 1);

			return oldest.item;
		}

		if (option === "newest") {
			let newest = this.queue[0];
			for (const item of this.queue) {
				if (item.priorityIndex > newest.priorityIndex) {
					newest = item;
				}
			}
			let index = this.queue.indexOf(newest);
			this.queue.splice(index, 1);

			return newest.item;
		}

		if (option === "highest") {
			let maxPriority = this.queue[0];
			for (const item of this.queue) {
				if (item.priority > maxPriority.priority) {
					maxPriority = item;
				}
			}

			let index = this.queue.indexOf(maxPriority);
			this.queue.splice(index, 1);

			return maxPriority.item;
		}

		if (option === "lowest") {
			let minPriority = this.queue[0];
			for (const item of this.queue) {
				if (item.priority < minPriority.priority) {
					minPriority = item;
				}
			}

			let index = this.queue.indexOf(minPriority);
			this.queue.splice(index, 1);

			return minPriority.item;
		}
	}
}

const test = new biDirectionalPriorityQueue();
test.enqueue("dog", 4);
test.enqueue("horse", 3);
test.enqueue("cat", 1);
test.enqueue("fish", 2);
test.enqueue("cow", 6);
test.enqueue("hamster", 5);

console.log(`Oldest: ${test.peek("oldest")}`);
console.log(`Newest: ${test.peek("newest")}`);
console.log(`Highest priority: ${test.peek("highest")}`);
console.log(`Lowest priority: ${test.peek("lowest")}`);

console.log(test.queue);

console.log(`Oldest delete: ${test.dequeue("oldest")}`);
console.log(`Newest delete: ${test.dequeue("newest")}`);
console.log(`Highest delete: ${test.dequeue("highest")}`);
console.log(`Lowest delete: ${test.dequeue("lowest")}`);

console.log(test.queue);
