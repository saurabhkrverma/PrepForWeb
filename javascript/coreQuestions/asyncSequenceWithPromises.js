// ref: https://bigfrontend.dev/problem/implement-async-helper-sequence

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

const promisifyFunc = (func) =>{
    return (data) => {
        return new Promise((resolve, reject)=>{
            func((err,data)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(data);
                }
            },data);
        });
    }
}

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
    const promisifiedFuncs = funcs.map((func)=>promisifyFunc(func));
    return (callback, data) => {
        const promiseChain = promisifiedFuncs.reduce((prevPromise, currPromise)=>{
            return prevPromise.then((data)=>currPromise(data));
        },Promise.resolve(data))
        promiseChain.then((data)=>{
            callback(undefined,data);
        }).catch((err)=>{
            callback(err)
        });
    };
}


const asyncTimes4 = sequence(
    [
        asyncTimes2,
        asyncTimes2
    ]
)

asyncTimes4((error, data) => {
    console.log(data) // 4
},2)
