// https://bigfrontend.dev/problem/implement-async-helper-parallel

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

const async1 = (callback) => {
    callback(undefined, 1)
}

const async2 = (callback) => {
    callback(undefined, 2)
}

const async3 = (callback) => {
    callback(undefined, 3)
}

const async4 = (callback) => {
    callback(undefined, 4)
}

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback, data: any) => void}
 */
function parallel(funcs){
    const results = [];
    let originalCallback;
    let callbacksResolved = 0
    let resolved = false;

    const myCallback = (index, err, data) => {
        if(resolved) {
            return;
        }
        if(err) {
            resolved = true;
            return originalCallback(err,data);
        }
        results[index] = data;
        callbacksResolved++;
        if(callbacksResolved >= funcs.length){
            return originalCallback(err, results)
        }
    }

    return (callback, data) => {
        originalCallback = callback;
        for(let i=0; i< funcs.length; i++){
            funcs[i](myCallback.bind(this, i));
        }
    }
}

// const all = parallel(
//     [
//         async1,
//         async2,
//         async3,
//         async4
//     ]
// )

// all((error, data) => {
//     console.log(error,data) // [1, 2, 3]
// },1)


// lets do this with the help of promises

const promisifyWithCallback = (func) => {
    return new Promise((resolve, reject)=>{
        const myCallback = (err,data) => {
            if(err) {
                return reject(err)
            }
            return resolve(data);
        }
        return Promise.resolve(func(myCallback)).then((data)=>{
            resolve(data);
        })
    }).catch((err)=>{
        return Promise.reject(err);
    })
}

const allWithPromise = (funcs) => {
    return (callback) => {
        // get promisified version of functions
        const promisifedFuncs = funcs.map(func => promisifyWithCallback(func));
        Promise.all(promisifedFuncs).then((data) => {
            callback(undefined, data);
        }).catch((err) => {
            callback(err, undefined);
        })

    }
}

const all = allWithPromise(
    [
        async1,
        async2,
        async3,
        async4
    ]
)

all((error, data) => {
    console.log(error,data) // [1, 2, 3]
})
