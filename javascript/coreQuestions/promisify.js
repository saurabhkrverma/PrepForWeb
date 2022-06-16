// ref:https://bigfrontend.dev/problem/promisify

/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
    return (arg1,arg2) => {
        return new Promise((resolve, reject)=>{
            const myCallback = (error,data) => {
                if(error){
                    reject(error);
                } else {
                    resolve(data)
                }
            }
            func.call(this, arg1, arg2, myCallback);
        })
    }
}


const func = (arg1, arg2, callback) => {
    setTimeout(()=>{
        callback(null,"hello");
    },1000)
}

const callback = (error, data) => {
    if (error) {
        console.log("error", error)
    } else {
        console.log("data", data)
    }
}

const newFunc = promisify(func);

// func(1,2,callback);

newFunc(1,2,callback)
    .then((data)=>{
        console.log("data-p", data)
    }).catch((error)=>{
        console.log("error-p", error)
    })
