import { counter, runWithTimeout } from 'lab2';

const skipEven = (i) => i % 2 === 0;
const gen = counter(skipEven);
runWithTimeout(gen, 5, (sum) => {
    console.log(sum)
});