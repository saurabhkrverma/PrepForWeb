// ref:https://bigfrontend.dev/problem/promisify

const callback = (error, data) => {
    if (error) {
        console.log("callback - error", error)
    } else {
        console.log("callback - data", data);
    }
}

const func = (arg1, arg2, callback) => {
    setTimeout(()=>{
        callback(null,arg1+arg2);
    },0)
}

const promisify = (func) => {
    return (arg1, arg2) => {
        return new Promise((resolve, reject)=>{
            const callback = (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
            func(arg1, arg2, callback);
        })
    }
}

const test = promisify(func);

test(1,2).then(console.log);