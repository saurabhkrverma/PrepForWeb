// https://bigfrontend.dev/problem/create-your-own-Promise

const STATES = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
class MyPromise {

    constructor(callback) {
        this.state = STATES.PENDING;
        this.result = null;
        this.task = null;
        this.next=null;
        try {
            callback(this._resolve, this._reject);
        } catch (err) {
            this._reject(err);
        }

    }

    executor = ()=>{
        queueMicrotask(() => {
            if(!this.task) return;
            const result = this.task(this.result);
            const isReturnValuePromise = result instanceof MyPromise;
            if(!isReturnValuePromise) {
                this?.next?._resolve(result);
            } else {
                result.then(result._resolve)
                // this?.next?._resolve(result);
            }
        });
    }

    then (successCallback) {
        const isSuccessCallback = typeof successCallback === "function";
        successCallback = isSuccessCallback ? successCallback : (value)=>value;
        this.task = successCallback;
        this.next =  new MyPromise((resolve, reject)=>{
        });
        return this.next;
    }

    catch (err) {
        // this.task = callback;
        // return this;
    }

    _resolve = (result) => {
        if(this.state !== STATES.PENDING) return // this is to make sure only pending promises are resolved and multiple resolutions aren't done
        this.state = STATES.FULFILLED;
        this.result = result;
        this.executor();
    }

    _reject(err) {
        if(this.state !== STATES.PENDING) return // this is to make sure only pending promises are resolved and multiple resolutions aren't done
        this.state = STATES.REJECTED;
        this.result = err;
    }
}
const func = (resolve, reject)=> {
    setTimeout(() => {
        resolve(1);
    }, 0)
}

const counter = (num)=>num+1;

const counterWithPromise = (num)=>{
    return new MyPromise((resolve,reject)=>resolve(num+1));
}

const counterNew = (num)=>{
    return new Promise((resolve,reject)=>resolve(num+1));
}

const test = new MyPromise(func);
test.then(counter).then(counterWithPromise).then(console.log);

const foo = new Promise(func);

// foo.then(counterNew).then(counterNew).then(console.log);
