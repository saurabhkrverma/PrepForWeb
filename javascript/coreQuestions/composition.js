// https://bigfrontend.dev/problem/what-is-composition-create-a-pipe

/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */

function pipe(funcs) {
    // your code here
    let result = null
    return (arg)=>{
        result = arg;
        funcs.forEach((func)=>{
            result = func(result);
        })
        return result;
    }
}
