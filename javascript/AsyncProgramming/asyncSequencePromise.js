// inspired by  https://bigfrontend.dev/problem/implement-async-helper-sequence
const myCallback = (err, data) => {
    if(err){
        console.log('callback-error', err)
    } else {
        console.log('callback-success',data)
    }
}

const asyncTimes2 = (num) => {
    return Promise.resolve(num*2)
}

const asyncTimes5 = (callback, num) => {
    setTimeout(() => callback(null, num * 5), 100)
}

const sequenceAsync = (funcs) => {
    let result;
    return async (arg) => {
        result = arg;
        for (let index=0; index < funcs.length; index++) {
            const currentFunc = funcs[index];
            result = await currentFunc(result);
        }
        return result
    }
}

// let's do same with promises


const sequencePromise = (funcs) => {
    let result;
    return (arg) => {
        return new Promise((resolve, reject)=>{
            result = arg;
            const foo = funcs.reduce((promise,func)=>{
                return promise.then((result)=>{
                    return func(result);
                })
            },Promise.resolve(result))
            resolve(foo)
        })
    }
}
const callback = sequenceAsync([
    asyncTimes2,
    asyncTimes2
])

const callback2 = sequencePromise([
    asyncTimes2,
    asyncTimes2
])

callback(10).then(console.log)
callback2(10).then(console.log)