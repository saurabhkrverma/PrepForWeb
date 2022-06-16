// ref:https://bigfrontend.dev/problem/count-function


function count(){
    ++count.value;
    return count.value;
}

count.value = 0;

count.reset = function(){
    count.value = 0;
}



console.log(count())
console.log(count())
console.log(count())

count.reset()


console.log(count())
console.log(count())
console.log(count())


let count2 = (function(){
    let _count = 0;
    let func = ()=> ++_count;
    func.reset = () => {_count=0};
    return func
})();

console.log(count2())
console.log(count2())
console.log(count2())

count2.reset()


console.log(count2())
console.log(count2())
console.log(count2())
