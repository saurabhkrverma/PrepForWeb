// https://bigfrontend.dev/problem/throttle-Promises




/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max){
    let activePromises = 0;
    let promisesResolved = 0;
    const results = [];

    if(funcs.length <= 0) {
        return Promise.resolve([]);
    }

    const myPromise = new Promise((resolve, reject)=>{
        let currentIndex = 0;
        const executePromise = (index) => {
            const apiCall = funcs[index];
            if(apiCall){
                const apiPromise = apiCall();
                apiPromise.then((result)=>{
                    mySuccessCallback(result, index);
                }).catch((err)=>{
                    mySuccessCallback(err, index, true);
                })
            }
        }
        const mySuccessCallback = (result, index, error) => {
            if(error) {
                reject(result);
            }

            promisesResolved++;
            activePromises--;
            results[index] = result;
            if(promisesResolved >= funcs.length) {
                resolve(results);
            } else {
                executePromise(currentIndex++);
            }
        }

        for(currentIndex; currentIndex < max; currentIndex++){
            executePromise(currentIndex);
        }
    });

    return myPromise
}


var value = 0;
var asyncFactory = function() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(value++);
        }, 10);
    });
};

const arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(asyncFactory);
}

const throttled = throttlePromises(arr, 5)
throttled.then(console.log).catch(console.log);