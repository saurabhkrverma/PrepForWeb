// https://bigfrontend.dev/problem/flatten-Thunk

const func1 = (cb) => {
    setTimeout(() => cb(null, 'ok'), 10)
}

const func2 = (cb) => {
    setTimeout(() => cb(null, func1), 10)
}

const func3 = (cb) => {
    setTimeout(() => cb(null, func2), 10)
}

// func3((err, data)=>{
//     console.log(err,data);
// })

/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */
function flattenThunk(thunk) {
    let orgCallback;
    const myCallback = (err,data) => {
        if(err){
            orgCallback(err)
        } else {
            if(typeof data === 'function') {
                data(myCallback)
            } else {
                orgCallback(err,data);
            }
        }
    };


    return (callback)=>{
        orgCallback = callback;
        thunk(myCallback)
    }
}

flattenThunk(func3)((error, data) => {
    console.log('check',error,data) // 'ok'
})