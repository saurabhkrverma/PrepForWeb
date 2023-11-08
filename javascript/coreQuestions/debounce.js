// ref: https://bigfrontend.dev/problem/implement-basic-debounce

let currentTime = 0;

const run = (input) => {
    currentTime = 0
    const calls = []

    const func = (arg) => {
        calls.push(`${arg}@${currentTime}`)
    }

    const debounced = debounce(func, 3)
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        setTimeout(() => debounced(arg), time)
    })
    return calls
}

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
    let timeoutId = null;
    return (...args) => {
        const executeFunc = () => {
            func.apply(this,args);
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(executeFunc,wait);
    }
}

console.log("result", run(['A@0']));

