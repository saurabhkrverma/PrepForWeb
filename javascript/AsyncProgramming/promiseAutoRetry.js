// https://bigfrontend.dev/problem/retry-promise-on-rejection

let count = 0;
const dummyPromise= () => {
    if(count <=3){
        count++;
        return Promise.reject('error');
    }
    return Promise.resolve('result')
};

let callCount = 0
let fetcher = () => new Promise((resolve, reject) => {
    callCount += 1
    if(callCount >=7) resolve('voila')
    reject('error')
})

const resolverWrapper = (fetcher,maximumRetryCount) => new Promise((resolve, reject)=>{
    return fetchWithAutoRetry(fetcher,maximumRetryCount).then((result)=>{
        resolve(result);
    }).catch((err)=>{
        reject(err);
    })
});

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @param {Object<any>} err object
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount, ) {
    // base condition
    if(maximumRetryCount <= 0) {
        return Promise.reject('final error');
    }

    return new Promise((resolve, reject)=>{
        fetcher().then((result)=>{
            resolve(result);
        }).catch((err)=>{
             return resolverWrapper(fetcher, --maximumRetryCount)
        }).then((result)=>{resolve(result)}).catch((err)=>{reject(err)})
    })
}

function fetchWithAutoRetry1(fetcher, maximumRetryCount) {
    return fetcher().catch((e) => {
        console.log('error', maximumRetryCount);
        if (maximumRetryCount === 0) {
            throw e
        } else {
            return fetchWithAutoRetry1(fetcher, maximumRetryCount - 1)
        }
    })
}

function fetchWithAutoRetry2(fetcher, maximumRetryCount, ) {
    // base condition
    if(maximumRetryCount <= 0) {
        return Promise.reject('error');
    }
    return fetcher().catch((err) => {
        return fetchWithAutoRetry(fetcher, --maximumRetryCount)
    })
}

// dummyPromise.then(console.log).catch(console.log);

// console.log('check this', dummyPromise, dummyPromise.then)

// fetchWithAutoRetry2(fetcher, 6).then((result)=>{
//     console.log('resolved', result, callCount);
// }).catch((err)=>{
//     console.log('rejected', err, callCount);
// })

function fetchWithAutoRetry3(fetcher, maximumRetryCount, ) {
    if(maximumRetryCount <= 0) {
        return Promise.reject('final error');
    }
    return new Promise((resolve, reject)=>{
        fetcher().then((result)=>{
            resolve(result);
        }).catch((err)=>{
            return fetchWithAutoRetry3(fetcher, --maximumRetryCount).then((result)=>resolve(result)).catch((err)=>reject(err))
        })
    })
}

function fetchWithAutoRetry4(fetcher, maximumRetryCount, ) {

    if(maximumRetryCount <= 0) {
        return Promise.reject('final error');
    }

    return fetcher().catch((err)=>{
        return fetchWithAutoRetry4(fetcher, --maximumRetryCount)
    })
}

// fetchWithAutoRetry3(fetcher, 9).then((result)=>{
//     console.log('final resolved', result, callCount);
// }).catch((err)=>{
//     console.log('final rejected', err, callCount);
// })

Promise.resolve(Promise.resolve(Promise.reject('bye').catch((err)=>Promise.resolve(Promise.resolve('hi'))))).then(console.log)