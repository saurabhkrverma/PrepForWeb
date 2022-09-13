// ref: https://bigfrontend.dev/problem/implement-curry

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

let curry = (fn) => {
    let curried = (...args) => {
        if(args.length >= fn.length){
            return fn(...args)
        } else {
            return (...next)=>{
                return curried(...args,...next)
            }
        }
    }

    return curried;
}

const curriedJoin = curry(join)

const result1 = curriedJoin(1, 2, 3) // '1_2_3'

const result2 =  curriedJoin(1)(2, 3) // '1_2_3'

const result3 =  curriedJoin(1, 2)(3) // '1_2_3'


console.log(result1, result2, result3);
