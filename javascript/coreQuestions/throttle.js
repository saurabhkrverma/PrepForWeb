// ref: https://bigfrontend.dev/problem/implement-basic-throttle
//

let currentTime = 0

const run = (input) => {
    currentTime = 0
    const calls = []

    const func = (arg) => {
        calls.push(`${arg}@${currentTime}`)
    }

    const throttled = throttle(func, 3)
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        setTimeout(() => throttled(arg), time)
    })
    return calls
}

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
    let invoked = false;
    let lastArgs = null;
    return function throttled(...args) {
        lastArgs = args;
        if(!invoked) {
            func.apply(this,args);
            invoked = true;
            lastArgs = null;
            return;
        }
        let timeoutId = setTimeout(()=>{
            invoked = false;
            if(lastArgs) {
                throttled.apply(this,lastArgs);
            }
        },wait-1)
    }
}

console.log("result", run(['A@0', 'B@4', 'c@8']));
