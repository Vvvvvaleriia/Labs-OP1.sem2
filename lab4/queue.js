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
			queueIndex: this.queueCounter,
		});

		this.queueCounter++;
	}

	#findElem(option) {
		let elem = this.queue[0];

		for (const item of this.queue) {
			if (option === "oldest" && item.queueIndex < elem.queueIndex) {
				elem = item;
			}

			if (option === "newest" && item.queueIndex > elem.queueIndex) {
				elem = item;
			}

			if (option === "highest" && item.priority > elem.priority) {
				elem = item;
			}

			if (option === "lowest" && item.priority < elem.priority) {
				elem = item;
			}
		}
		return elem;
	}

	peek(option) {
		if (this.queue.length === 0) {
			return null;
		}
		return this.#findElem(option).item;
	}

	dequeue(option) {
		if (this.queue.length === 0) return null;

		const elem = this.#findElem(option);
		const index = this.queue.indexOf(elem);
		this.queue.splice(index, 1);
		return elem.item;
	}
}

const test = new BiDirectionalPriorityQueue();
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
