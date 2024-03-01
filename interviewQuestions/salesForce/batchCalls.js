// given a array of functions/calls, execute them in batches of max 2.
const func1 = (callback)=>{
    console.log("func1 started");
    setTimeout(()=>{
        console.log("func1 completed");
        callback(1);
    },1000)
}

const func2 = (callback)=>{
    console.log("func2 started");
    setTimeout(()=>{
        console.log("func2 completed");
        callback(2);
    },6000)
}

const func3 = (callback)=>{
    console.log("func3 started");
    setTimeout(()=>{
        console.log("func3 completed");
        callback(3);
    },2000)
}

const batchCalls = (funcs=[], batchSize=2) => {
    return ()=>{
        const mycallback = ()=>{
            if(funcs.length>0){
                const func = funcs.shift();
                executor(func);
            } else {
                // console.log("execution of all functions completed");
            }
        }

        const executor = (func) => {
            func(mycallback);
        }

        for(let i=0; i<batchSize; i++){
            const func = funcs.shift();
            if(!func){
                break;
            }
            executor(func);
        }
    }
}

// const batch = batchCalls([func1, func2, func3],4);
// batch();


const test1 = async (a,b)=>{
    return "1";
}

const test2 = async (a,b)=>{
    throw new Error("my error 2");
}

const test3 = async (a,b)=>{
    return "3"
}

test1().then(test2()).then(test3()).then((result)=>{console.log("success", result)}).catch((err)=>{console.log("error",err)});