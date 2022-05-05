// ref: https://bigfrontend.dev/problem/implement-general-memoization-function

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
const _resolver = (...args)=>{
    return Array.from(args).join("_");
}

function memo(func, resolver=_resolver) {
    let cacheMap = new Map();
    // arrow function will not work in this case because it attached the this keyword to its lexical scope that is how function memo was
    // called which in this case would be window
    return function(...args){
        let cacheKey = resolver(...args);
        if(cacheMap.has(cacheKey)){
            console.log("hit");
            return cacheMap.get(cacheKey);
        } else {
            console.log("miss");
            let result = func(...args);
            cacheMap.set(cacheKey,result);
            return result;
        }
    }
}

// use this to check arrow ve function declaration in memo function.
// function funcThis(b){
//     return `${this.a}_${b}`
// }
// const memoed = memo.call(this,funcThis)
// const a = {
//     a: 1,
//     memoed
// }
// console.log(a.memoed());



const sampleFunc = (a,b)=>{
    return a*b;
}

const sampleMemo = memo(sampleFunc,resolver);
console.log(sampleMemo(1,2));
console.log(sampleMemo(1,3));
console.log(sampleMemo(1,2)); // should return from cache
console.log(sampleMemo(1,4));

