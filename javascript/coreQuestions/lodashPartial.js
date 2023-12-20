// https://bigfrontend.dev/problem/implement-partial

/**
 * @param {Function} func
 * @param {any[]} args
 * @returns {Function}
 */
function partial(func, ...args) {
    return function (...nextArgs){
        const orgArgs = [...args];
        orgArgs.forEach((arg, index)=>{
            if(typeof arg === 'symbol'){
                orgArgs.splice(index,1,nextArgs.shift());
            }
        })
        return func.call(this,...orgArgs,...nextArgs);
    }
}

partial.placeholder = Symbol("_");

const func = function(...args){
    return [this.prop, ...args]
}
const _ = partial.placeholder
const func12_4 = partial(func, 1,2,_,4)
const a = {
    prop: 1,
    func12_4
}
const b = {
    prop: 2,
    func12_4
}

console.log(a.func12_4(3,5));