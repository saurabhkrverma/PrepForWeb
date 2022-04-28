// ref: https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option


let currentTime = 0

const run = (input) => {
    currentTime = 0
    const calls = []

    const func = (arg) => {
        calls.push(`${arg}@${currentTime}`)
    }

    const debounced = debounce(func, 3)
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        setTimeout(() => debounced(arg), time)
    })
    return calls
}

const debounce = (func, wait, option ={leading:false,trailing:true}) => {
    let timeoutId = null;
    let isInvoked = false;
    return function debounced(...args) {
        if(option.leading === true && !isInvoked){
            func.apply(this, args);
            isInvoked = true;
            return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{
            if(option.trailing) {
                func.apply(this, args);
            }
            isInvoked = false;
        }, wait)
    }
}



expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['C@6'])
