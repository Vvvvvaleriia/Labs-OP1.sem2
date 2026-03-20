export function* counter(predicate) {
    let i = 0;
    while (true) {
        if (predicate && predicate(i)) {
            i++;
            continue;
        }
        yield i++;
    }
}