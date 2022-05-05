// ref: https://bigfrontend.dev/problem/create-lazyman

const createLaziness = (logFunc) => {
    return {
        eat: eatFunc.bind(this,logFunc),
        sleep: sleepFunc.bind(this, logFunc)
    }
}

const eatFunc = (logFunc,food) => {
    logFunc(`Eat ${food}`);
    return createLaziness(logFunc);
}

const sleepFunc = (logFunc,sleepTime) => {
    const timeoutId = setTimeout(()=>{
        logFunc(`Wake up after ${sleepTime} seconds`);
    },sleepTime*1000);
    return createLaziness(logFunc);
}

/**
 * @param {string} name
 * @param {(log: string)=>void} logFunc
 * @returns {laziness}
 */
const lazyMan = (name, logFunc) =>{
    let lazyMan = { name };
    let tasks = [];

    let executeTask = ()=>{
        const task = tasks.shift()
        task && task();
    }

    lazyMan.talk = ()=>{
        tasks.push(()=>{
            logFunc(`Hi, I'm ${name}.`)
            executeTask();
        });
        return lazyMan;
    }
    lazyMan.eat = (food)=>{
        tasks.push(()=>{
            logFunc(`Eat ${food}`);
            executeTask();
        });
        return lazyMan;
    }
    lazyMan.sleep = (sleepTime) => {
        tasks.push(()=>{
            setTimeout(()=>{
                if(sleepTime>1){
                    logFunc(`Wake up after ${sleepTime} seconds.`);
                } else {
                    logFunc(`Wake up after ${sleepTime} second.`);
                }
                executeTask();
            },sleepTime*1000)
        })
        return lazyMan
    }
    lazyMan.sleepFirst = (sleepTime) => {
        tasks.unshift(()=>{
            setTimeout(()=>{
                if(sleepTime>1){
                    logFunc(`Wake up after ${sleepTime} seconds.`);
                } else {
                    logFunc(`Wake up after ${sleepTime} second.`);
                }
                executeTask();
            },sleepTime*1000)
        })
        return lazyMan
    }
    lazyMan.talk();
    setTimeout(executeTask);
    return lazyMan;
}


lazyMan('sanju',console.log).eat('pizza').eat("biryani").sleep(5).eat("icecream").sleepFirst(2);
