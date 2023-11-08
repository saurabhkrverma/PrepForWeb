// https://bigfrontend.dev/problem/implement-Promise-any

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 * **/
const myPromiseAny = (promises) => {
    const errors = [];
    let promisesRemaining = promises.length;

    if(promisesRemaining === 0) {
        return Promise.resolve([]);
    }

    const myPromise = new Promise((resolve, reject)=>{
        const mySuccessCallback = (result) => {
            resolve(result);
        }

        const myErrorCallback = (err, index) => {
            errors[index] = err;
            promisesRemaining--;
            if(promisesRemaining === 0) {
                reject(new AggregateError('no promise was resolved', errors))
            }
        }

        promises.forEach((promise, index) => {
            if(promise.then) {
                // to check if given input is a promise
                promise.then((result)=>{
                    mySuccessCallback(result,index, reject);
                }).catch((err)=>{
                    myErrorCallback(err, index, reject);
                })
            } else {
                mySuccessCallback(promise, resolve);
            }
        })
    });
    return myPromise;
}


const promise1 = Promise.resolve(3);
const promise2 = Promise.reject(2)
const promise3 = new Promise((resolve) => {
    setTimeout((result)=>{
        resolve(result)
    }, 100, 'foo');
});

myPromiseAny([promise1,promise2,promise3]).then(console.log)
