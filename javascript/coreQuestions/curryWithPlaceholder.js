// ref: https://bigfrontend.dev/problem/implement-curry-with-placeholder

const curried = (...args) => {
    if(args.length >= fn.length){
        return fn(...args)
    } else {
        return curried.bind(this,...args);
    }
}

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
let curry = (fn) => {
    let curried = (...args) => {
        let count = 0;
        for(let i=0; i<fn.length; i++){
            if(i >=args.length){
                break
            }
            if(args[i] !== "_") {
                count++;
            }
        }
        console.log(count, args);
        if(count >= fn.length){
            return fn(...args)
        } else {
            return (...next)=>{
                // replace the placeholder
                let j=0;
                for(let i=0; i< args.length; i++){
                    let currentChar = args[i];
                    if(currentChar === "_" && j< next.length){
                        args[i] = next[j];
                        next.splice(0,1);
                    }
                }
                return curried(...args,...next)
            }
        }
    }

    return curried;
}


const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)


let result2 = curriedJoin(1)(2)(3)// '1_2_3'


console.log(result2);

