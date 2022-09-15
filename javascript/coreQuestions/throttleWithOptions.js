// ref:https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {
    let invoked = false;
    let lastArgs;
    return function throttled(...args){
        if(!invoked){
            if(option.leading){
                func.apply(this,args);
            }
            // check for last args for recersive trailing call
            else if(lastArgs && option.trailing){
                func.apply(this,args);
            }
            invoked = true;
            lastArgs = false;
        } else {
            if (option.trailing){
                lastArgs = args;
            }
            return;
        }
        setTimeout(()=>{
            invoked = false;
            if(lastArgs){
                throttled(lastArgs);
            }
        }, wait)
    }
}



