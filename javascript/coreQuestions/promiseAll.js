const myPromiseAll = (promises) => {
    const promisesCount = promises.length;
    let currCount = 0;
    const results = [];
    let isError = false;

    return new Promise((resolve, reject)=>{
        const _callback = (resolve, reject, error, result, index) => {
            if(error) {
                isError = true;
                console.log("reject - error", error);
                reject(error);
            } else {
                currCount++;
                results[index] = result;
                console.log("result", result)
                if(currCount === promisesCount) {
                    console.log("resolve - result", result)
                    resolve(results)
                }
            }
        }
        for(let i=0; i<promises.length; i++) {
            let promise = promises[i];
            promise.then((values)=>{
                _callback(resolve, reject, null,values, i)
            }).catch((error)=>{
                _callback(resolve, reject, error, null, i)
            })
        }
    });
}

const foo = myPromiseAll([dummyPromise1, dummyPromise2, dummyPromiseReject1]);
foo.then((results)=>{
    console.log("foo resolved", results)
}).catch((error)=>{
    console.log("foo rejected", error)
});
