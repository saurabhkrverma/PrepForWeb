//Currying is a useful technique used in JavaScript applications.
//
// Please implement a curry() function, which accepts a function and return a curried one.

//more to read
// https://javascript.info/currying-partials
// https://lodash.com/docs/4.17.15#curry

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
