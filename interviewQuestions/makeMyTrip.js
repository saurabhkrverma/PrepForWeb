// create a auto retry mechanism with base condition and cool off period

// promise = promise, interval = 3 (in secs),  times = 3 (retry time), condition (data){
// if (condition){
// return true;
// }
// return false;
//}
//If condition return false then retry after time given. Else return result;

let count = 0;
const myPromise = async ()=>{
    count++;
    return count;
}
const myCondition = (result)=>{
    return (result > 2);
}

const foo = async (interval)=>{
    await new Promise ((resolve, reject)=>{
        console.log('waiting for ' + interval/1000 + 'secs');
        setTimeout(()=>{
            resolve()
        }, interval);
    });
    return;
}

const myAutoRetry = async (promise, interval, times, condition) => {
    try {
        const result  = await promise();
        if(condition(result)) {
            return result
        } else {
            throw new Error ('my error');
        }
    } catch (e) {
        if (times <= 0) {
            throw new Error('retry counts exhausted')
        } else {
            await foo(interval);
            return myAutoRetry(promise, interval, --times, condition);
        }
    }
}
