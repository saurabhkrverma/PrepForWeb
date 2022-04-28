// ref:https://bigfrontend.dev/problem/can-you-shuffle-an-array

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
