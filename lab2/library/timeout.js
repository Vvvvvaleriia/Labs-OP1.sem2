export function runWithTimeout(gener, sec, done){
    const startTime = Date.now();
    let sum = 0;

    const id = setInterval(() => {
        
        if ( Date.now() - startTime >= sec * 1000) {
            clearInterval(id)
            done(sum)
            return;
        }
        const result = gener.next();
        sum += result.value;
    },1000)
}