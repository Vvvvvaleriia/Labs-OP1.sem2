"use strict";

class biDirectionalPriorityQueue {
	constructor() {
		this.queue = [];
		this.priorityCounter = 0;
	}

	enqueue(item, priority) {
		this.queue.push({
			item,
			priority,
			priorityIndex: this.priorityCounter,
		});

		this.priorityCounter++;
	}
}

const test = new biDirectionalPriorityQueue();
test.enqueue("dog", 1);
test.enqueue("cat", 4);
test.enqueue("fish", 2);

console.log(test.queue);
