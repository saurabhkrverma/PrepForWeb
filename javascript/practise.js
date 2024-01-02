// chain promises

const async2= (num) => {
    return Promise.resolve(num*2);
}

// async2(2).then(async2).then(console.log);

const createPipe = (funcs)=>{
    return (num)=>{
        return new Promise((resolve, reject)=>{
            const chain = funcs.reduce((acc, func)=>{
                return acc.then(func)
            }, Promise.resolve(num))
            resolve(chain);
        })
    }
}



const test = createPipe([async2, async2])
test(2).then(console.log);