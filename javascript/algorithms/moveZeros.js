// ref:

let moveZeroes = function(nums) {
    let length = nums.length;
    for(let i=0; i< length;){
        const num  = nums[i];
        if(num === 0){
            nums.splice(i,1);
            nums.push(0);
            length = length-1;
        } else {
            i++;
        }
    }
    return nums
};


// without splice as splice also create an extra space;
let moveZeroesEfficiently = (nums)=>{
    let lastZero = -1;
    for(let i=0; i< nums.length;i++){
        const num  = nums[i];
        if(num !== 0 && lastZero >= 0) {
            // swap elems
            nums[lastZero] = nums[i];
            nums[i] = 0;
            lastZero++;
        } else if(num === 0) {
            lastZero = (lastZero>=0) ? lastZero : i;
        }
    }
    return nums
}

// console.log(moveZeroes([1,0,3,0,0,5,0]));
console.log(moveZeroes1([1,0,3,0,0,5,0]))
