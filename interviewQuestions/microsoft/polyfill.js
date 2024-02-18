
const asyncAdd = (a,b)=>{
    return new Promise((res,rej)=>{
        res(a+b);
    })
}

// asyncAdd(1,2).then((result)=>{
//     return 3
//     // return asyncAdd(result,3)
// }).then(console.log)


const STATES = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}

class MyPromise {
    constructor(callback) {
        this.state = STATES.PENDING;
        this.successCallback = null;
        this.errorCallback =null;
        this.result = null;
        this.err = null;
        try{
            callback(this._resolve.bind(this), this._reject.bind(this));
        }catch(err){
            this._reject(err);
        }
    }
    _executor() {
        queueMicrotask(()=>{
            switch(this.state){
                case STATES.FULFILLED:{
                    if(this.successCallback){
                        const result = this.successCallback(this.result);
                        const isPromise = result instanceof MyPromise;
                        if(isPromise){
                            result.then((result)=>{
                                this.next._resolve(result);
                            })
                        } else {
                            this.next._resolve(result);
                        }
                    }
                    break;
                }
                case STATES.REJECTED:{
                    if(this.errorCallback) {
                        this.errorCallback(this.err);
                    }
                }
                break;
            }
        })
    }

    _resolve(result){
        this.state = STATES.FULFILLED;
        this.result = result;
        this._executor()
        return new MyPromise(()=>{});
    }

    _reject(err){
        this.state = STATES.FULFILLED;
        this.err = err;
        this._executor()
        return new MyPromise(()=>{});
    }

    then(successCallback){
        this.successCallback = successCallback;
        this.next = new MyPromise(()=>{});
        return this.next;
    }

    catch(errorCallback){
        this.errorCallback = errorCallback;
    }

}


const asyncAdd2 = (a,b)=>{
    return new MyPromise((res,rej)=>{
        res(a+b);
    })
}

asyncAdd2(1,2).then((result)=>{
    return asyncAdd2(result,3);
}).then((result)=>{
    return asyncAdd2(result,4);
}).then(console.log);