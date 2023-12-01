// https://bigfrontend.dev/problem/implement-Array-prototype-reduce


const executor = (accumulator, currentValue, currentIndex, array) => {
    return accumulator+currentValue;
}

Array.prototype.myReduce = function(executor, initialValue) {
    const arr = this;
    let result = initialValue;
    for(let i=0; i<arr.length; i++) {
        initialValue = executor(initialValue,arr[i],i,arr);
    }
    return initialValue
};

([1,2,3]).myReduce(executor,0)
