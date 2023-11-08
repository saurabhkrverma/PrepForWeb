// https://bigfrontend.dev/problem/implement-Promise-allSettled

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 * **/
const myPromiseAllSettled = (promises) => {
    const results = [];
    let promisesRemaining = promises.length;

    if(promisesRemaining === 0) {
        return Promise.resolve(results);
    }

    const myPromise = new Promise((resolve)=>{
        const mySuccessCallback = (result, index) => {
            results[index] = {
                'status': 'fulfilled',
                'value': result
            };
            promisesRemaining--;
            if(promisesRemaining === 0) {
                resolve(results)
            }
        }
        const myErrorCallback = (result, index) => {
            results[index] = {
                'status': 'rejected',
                'reason': result
            };
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
                    myErrorCallback(err,index);
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

myPromiseAllSettled([promise1,promise2,promise3]).then(console.log)
