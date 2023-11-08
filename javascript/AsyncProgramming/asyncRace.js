// https://bigfrontend.dev/problem/implement-async-helper-race

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs){
    let originalCallback;
    let resolved = false
    const myCallback = (err, data) => {
        if(resolved) return;
        resolved = true;
        return originalCallback(err,data);
    }

    return (callback,data) => {
        originalCallback = callback;
        for(let i=0; i<funcs.length; i++){
            const currentFunc = funcs[i];
            currentFunc(myCallback);
        }
    }
}