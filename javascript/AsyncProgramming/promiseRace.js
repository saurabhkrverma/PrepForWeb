// https://bigfrontend.dev/problem/implement-Promise-race

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 * **/
const myPromiseAny = (promises) => {
    let promisesRemaining = promises.length;

    if(promisesRemaining === 0) {
        return Promise.resolve([]);
    }

    const myPromise = new Promise((resolve, reject)=>{
        promises.forEach((promise, index) => {
            if(promise.then) {
                // to check if given input is a promise
                promise.then((result)=>{
                    resolve(result)
                }).catch((err)=>{
                    reject(err)
                })
            } else {
                resolve(promise)
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
