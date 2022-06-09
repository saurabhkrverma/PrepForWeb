// ref: https://bigfrontend.dev/problem/jest-assertion

/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */

function myExpect(input) {
    const _toBe = (data, isNegate=false) =>{
        const result = Object.is(input,data);
        if((result && !isNegate) || (!result && isNegate)) {
            return true
        } else throw new Error("Test case failed");
    }

    const Matcher = {
        toBe: _toBe,
        not: {
            toBe: (data) => _toBe(data,true)
        }
    }
    return Matcher;
}

console.log(myExpect(null).not.toBe(undefined));

