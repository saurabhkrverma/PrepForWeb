// https://bigfrontend.dev/problem/implement-async-helper-sequence

// lets try one without the async functions

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
    let currentIndex = 0;
    let originalCallback;
    const myCallback = (err,data)=>{
        if(err){
            return originalCallback(err)
        }
        if(currentIndex >= funcs.length-1){
            return originalCallback(err, data)
        } else {
            currentIndex++;
            executor(myCallback,data);
        }
    }
    const executor =  (callback,data) => {
        if(currentIndex ===0) originalCallback = callback;
        const currentFunc = funcs[currentIndex];
        if(currentFunc) {
           currentFunc(myCallback, data)
        }
    }

    return executor;
}

// playing with promises

const myCallback = (err, data) => {
    if(err){
        console.log('callback-error', err)
    } else {
        console.log('callback-success',data)
    }
}

const asyncTimes2 = (callback, num) => {
    setTimeout(() => callback(null, num * 2), 100)
}

// asyncTimes2(myCallback,2);


const executor = (callback, num, func) => {
    func(callback, num);
}
const sequence2 = (asyncFuncs = [])=>{
    let originalCallback;
    const internalCallback = (err, data) => {
        if(err) {
            originalCallback(err);
        } else {
            const asyncFunc = asyncFuncs.shift();
            if(asyncFunc){
                executor(internalCallback, data, asyncFunc);
            } else originalCallback(err,data);
        }

    }
    return (callback, num) => {
        originalCallback = callback;
        const asyncFunc = asyncFuncs.shift();
        if(asyncFunc){
            executor(internalCallback, num, asyncFunc);
        } else callback(err, num);
    }
}

const asyncTimes4 = sequence(
    [
        asyncTimes2,
        asyncTimes2
    ]
)

// asyncTimes4((error, data) => {
//     console.log(data) // 4
// }, 2)

// asyncTimes2((err,data)=>{console.log(err,data)}, 5);

// const finalCallback = sequence([
//     asyncTimes2,
//     asyncTimes2
// ]);
//
// console.log(finalCallback)
// finalCallback((err,data)=>{
//    console.log('final callback', err, data)
// },2)

// const noop = (callback) => setTimeout(callback, 10)
// const thunk = sequence([noop, noop, noop])
// thunk((error, data) => {
//     console.log('kya scene hai isme', error, data);
// })

// let's try the same with promises
// how do we promisify a function

const simpleFunc = (data) => {
    const result  = data*2;
    throw 'error'
    return result;
};

const promisifyIt = (func) => {
    return new Promise((resolve, reject)=>{
        return Promise.resolve(func(2)).then(resolve)
    }).catch((err)=>{
        return Promise.reject(err);
    })
}
promisifyIt(simpleFunc).then((result)=>{
    console.log('final-resolve', result)
}).catch((err)=>{
    console.log('final-reject', err)
})



