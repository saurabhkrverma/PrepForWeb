// ref: https://bigfrontend.dev/problem/implement-Array-prototype.flat

//There is already Array.prototype.flat() in JavaScript (ES2019), which reduces the nesting of Array.
//
// Could you manage to implement your own one?

const flat = (arr, depth=1) => {
    if(depth <=0){
        return arr;
    } else {
        const newArr = [];
        let nestedArrayPresent=false;
        arr.forEach((elem) => {
            if(Array.isArray(elem)) {
                nestedArrayPresent = true;
                newArr.push(...elem);
            } else {
                newArr.push(elem);
            }
        })
        if(!nestedArrayPresent){
            // another base condition for optimisation
            return newArr;
        } else {
            return flat(newArr,--depth);
        }
    }
}

const arr1 = [1, 2, 3, [4]];
const arr2 = [1, 2, [3, [4]]];
const arr3 = [1, [2, [3, [4]]]];


console.log(flat(arr1), arr1.flat());
console.log(flat(arr2,2), arr2.flat(2));
console.log(flat(arr3,3), arr3.flat(3));

