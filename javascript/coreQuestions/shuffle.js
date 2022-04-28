// ref:https://bigfrontend.dev/problem/can-you-shuffle-an-array

//How would you implement a shuffle() ?
//
// When passed with an array, it should modify the array inline to generate a randomly picked permutation at the same probability.
// for an array like this:
// const arr = [1, 2, 3, 4]
// there would be possibly 4! = 24 permutations
// your shuffle() should transform the array in one of the above array, at the same 1/24 probability.

const generateRandomNumber = (limit) => {
    return Math.floor(Math.random()*limit)
}

/**
 * @param {any[]} arr
 * @returns {void}
 */
function shuffle(arr) {
    const length = arr.length;
    const shuffledIndexes = [];
    for(let index=0; index<length;) {
        if(shuffledIndexes[index]){
            index++;
            continue;
        }
        const newIndex = generateRandomNumber(length);
        const temp = arr[newIndex];
        arr[newIndex] = arr[index];
        arr[index] = temp;
        shuffledIndexes[newIndex] = true;
    }
}


const arr = [1,2,3,4];

console.log(shuffle(arr));
console.log(shuffle(arr));
