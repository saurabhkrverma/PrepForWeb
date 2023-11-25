const asyncTimes2 = async(num) => {
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

chain(2).then((result)=>{
    console.log('resolved', result);
}).catch(console.log);


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

chain2(2).then((result)=>{
    console.log('resolved-2', result);
}).catch(console.log);

