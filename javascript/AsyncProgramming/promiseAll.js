// https://bigfrontend.dev/problem/implement-Promise-all

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 * **/
const myPromiseAll = (promises) => {
    const results = [];
    let promisesRemaining = promises.length;

    if(promisesRemaining === 0) {
        return Promise.resolve(results);
    }

    const myPromise = new Promise((resolve, reject)=>{
        const mySuccessCallback = (result, index, isError) => {
            if(isError){
                reject(result);
            }
            results[index] = result;
            promisesRemaining--;
            if(promisesRemaining === 0) {
                resolve(results)
            }
        }

        promises.forEach((promise, index) => {
            if(promise.then) {
                // to check if given input is a promise
                promise.then((_result)=>{
                    mySuccessCallback(_result,index);
                }).catch((err)=>{
                    mySuccessCallback(err,index,true);
                })
            } else {
                mySuccessCallback(promise, index);
            }
        })
    });
    return myPromise;
}


const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
    setTimeout((result)=>{
        resolve(result)
    }, 100, 'foo');
});

//myPromiseAll([promise1,promise2,promise3]).then(console.log)

myPromiseAll([]).then(console.log)
