const promisifyFunc = (func) =>{
    return (data) => {
        return new Promise((resolve, reject)=>{
            func((err,data)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(data);
                }
            },data);
        });
    }
}

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs){
    const promisifiedFuncs = funcs.map((func)=>promisifyFunc(func));
    return (callback, data) => {
        const promiseChain = promisifiedFuncs.map((currPromise)=>{
            return currPromise(data);
        })
        Promise.race(promiseChain).then((data)=>{
            callback(undefined,data);
        }).catch((err,data)=>{
            callback(err,data)
        });
    };
}
