// https://bigfrontend.dev/problem/implement-Promise-prototype-finally

/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
    return new Promise((resolve,reject)=>{
        promise.then((value) => {
            return Promise.resolve(onFinally()).then(()=>{
                resolve(value)
            })
        }).catch((err)=>{
            return Promise.resolve(onFinally()).then(()=>{
                reject(err)
            })
        }).catch(reject)
    })
}

// function myFinally(promise, onFinally) {
//     return promise.then((value)=>{
//         console.log('1', value)
//         return Promise.resolve(onFinally()).then(()=>{
//             console.log('2', value)
//         })
//     }).catch((err)=>{
//         console.log('3', err)
//         return Promise.resolve(onFinally()).then((res)=>{
//             console.log('4', err)
//             return Promise.reject(err);
//         })
//     })
// }

const onFinally = () => {
    console.log('on finally')
}

const promise = Promise.resolve(100)
myFinally(promise, () => {
    onFinally()
    throw 'error'
}).then((value)=>{
    console.log('final resolve', value)
}).catch((err) => {
    console.log('final reject', err)
    // expect(value).toBe('error')
    // expect(onFinally).toHaveBeenCalled()
    // done()
})



