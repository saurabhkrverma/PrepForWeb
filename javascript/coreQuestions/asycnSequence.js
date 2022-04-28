// ref:https://bigfrontend.dev/problem/implement-async-helper-sequence

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

const asyncTimes2 = (callback, num) => {
    setTimeout(() => callback(null, num * 2), 1000)
}

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
    let originalCallback = null;
    let next = null;
    let err;
    const newCallback = (err,data) => {
        err= err;
        next(newCallback,data, true);
    }
    return function test(callback, data, dummy){
        if(!dummy) {
            originalCallback = callback;
        }
        if(funcs.length<=0) {
            //base condition
            originalCallback(err,data);
            return;
        }
        const func = funcs.shift();
        next = test;
        func(newCallback.bind(this),data);
    };
}

const asyncTimes4 = sequence(
    [
        asyncTimes2,
        asyncTimes2
    ]
)

// asyncTimes2((error, data) => {
//     console.log("here",data) // 4
// }, 4)

const noop = (callback) => setTimeout(callback, 10)
const thunk = sequence([noop, noop, noop])
thunk((error, data) => {
    console.log(error,data);
})

// asyncTimes4((error, data) => {
//     console.log(data) // 4
// })
