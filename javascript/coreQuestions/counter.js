// https://bigfrontend.dev/problem/create-a-counter-object


let counter = ()=>{
    let _count=0
    return (function(){
        return {
            get count(){
                return ++_count;
            },
            set count(num){
                // nothing
            }
        }
    })()
}

const test = counter();
console.log(test.count)
console.log(test.count)
console.log(test.count)
