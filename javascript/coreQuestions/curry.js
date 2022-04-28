// ref: https://bigfrontend.dev/problem/implement-curry

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curried = (...args)=> {
    if (args.length >= join.length) {
        return join.apply(this, args)
    } else {
        return curried.bind(this, ...args);
    }
}

const curry = (join) => {
    return curried;
}

const curriedJoin = curry(join)

const result1 = curriedJoin(1, 2, 3) // '1_2_3'

const result2 =  curriedJoin(1)(2, 3) // '1_2_3'

const result3 =  curriedJoin(1, 2)(3) // '1_2_3'


console.log(result1, result2, result3);
