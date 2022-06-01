//ref: https://leetcode.com/problems/squares-of-a-sorted-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortedSquares = function(nums) {
    const negatives = [];
    const newNums = [];
    for(let i=0; i<nums.length;){
        const currNum = nums[i];
        if(currNum<0){
            const squaredNum = Math.pow(currNum,2);
            // as they will be sorted in ascending order
            negatives.unshift(squaredNum);
            // remove the negative number fom the original array as after being squared it would a positive number out of its place
            nums.shift();
        } else {
            nums[i] = Math.pow(currNum,2);
            i++;
        }
    }

    while(nums.length && negatives.length){
        if(nums[0] < negatives [0]) {
            newNums.push(nums[0]);
            nums.shift();
        } else {
            newNums.push(negatives[0]);
            negatives.shift();
        }
    }

    // shift the remaining items
    if(nums.length > 0) {
        while(nums.length){
            newNums.push(nums[0]);
            nums.shift();
        }
    } else {
        while(negatives.length){
            newNums.push(negatives[0]);
            negatives.shift();
        }
    }

    return newNums;
};


// trying ot optimise the time and space complexity
const sortedSquares2 = function(nums) {
    let max = nums.length-1;

    for(let i=0; i<nums.length;){
        let currNum = nums[i];
        if(currNum <0){
            // iterate to check the correct position
            while(Math.abs(currNum)<=nums[max] && max > 0){
                max--;
            }
            // split the array
            currNum = nums.shift();
            const temp = nums.splice(max);
            nums.push(Math.abs(currNum));
            nums = nums.concat(temp);

        } else{
            const squaredNum = Math.pow(currNum,2);
            nums[i] = squaredNum;
            i++;
        }
    }

    return nums;
};

const sortedSquares3 = (nums)=>{
    let left = 0;
    let right = nums.length-1;
    const result = [];
    for(let i=nums.length-1; i>=0 ; i--){
        const squaredLeft = nums[left] ** 2;
        const squaredRight = nums[right] ** 2;
        if(squaredLeft>squaredRight){
            result.unshift(squaredLeft)
            left++;
        } else {
            result.unshift(squaredRight)
            right--;
        }
    }
    return result;
}

// const nums = [-4,-1,0,2,9];
console.log(sortedSquares3([-4,-1,0,2,9]));
console.log(sortedSquares3([-5,-1,-1,1,5]));


