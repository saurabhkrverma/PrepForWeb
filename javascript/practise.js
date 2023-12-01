const asyncTimes2 = (num) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(num>8){
                reject("err");
            }
            resolve(num*2);
        },0)
    })
}

const sequence = (asyncFuncs=[]) => {
    return (num) => {
        return new Promise((resolve, reject)=>{
            const chainedPromises = asyncFuncs.reduce((prevPromise, newPromise)=>{
                return prevPromise.then(newPromise).catch(reject);
            }, Promise.resolve(num));
            chainedPromises.then(resolve).catch(reject)
        });
    }
}

const chain = sequence([asyncTimes2, asyncTimes2]);

// chain(2).then((result)=>{
//     console.log('resolved', result);
// }).catch(console.log);


const sequence2 = (asyncFuncs=[])=>{
    return async (num) => {
        for(let i=0; i<asyncFuncs.length; i++){
            const asyncFunc = asyncFuncs[i];
            num = asyncFunc(num);
        }
        return num;
    }
}

const chain2 = sequence([asyncTimes2, asyncTimes2]);

// chain2(2).then((result)=>{
//     console.log('resolved-2', result);
// }).catch(console.log);


const myPromiseAll = (promises = [])=>{
    return new Promise ((resolve, reject)=>{
        if(promises.length === 0){
            resolve(promises);
        }
        const promisesFulfilled = [];
        let count=0;
        const callback = (err, data, index) =>{
            if(err){
                reject(err);
            } else {
                promisesFulfilled[index] = data;
                count++;
                if(count>=promises.length){
                    // all done
                    resolve(promisesFulfilled);
                }
            }
        }
        for(let i=0; i< promises.length; i++){
            const currentPromise = promises[i];
            const isPromise = currentPromise instanceof Promise;
            if(isPromise){
                currentPromise.then((result)=>{
                    callback(null,result,i)
                }).catch((err)=>{
                    callback(err)
                });
            } else {
                callback(null,currentPromise,i);
            }

        }
    });
}

// myPromiseAll([asyncTimes2(2), asyncTimes2(4), 43]).then(console.log);
//
// myPromiseAll([]).then(console.log);

// Promise.all([asyncTimes2(2),asyncTimes2(4)]).then(console.log);


const test = [1,2,3,[4,5],6,[7,8]];




