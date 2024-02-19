// ref: https://leetcode.com/problems/sort-colors/

const swapNumbers = (nums, a, b) =>{
    const temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums) {
    let left=0;
    let right=nums.length-1;
    let i=0;
    while(i<=right){
        const currElem = nums[i];
        if(currElem === 0){
            swapNumbers(nums, left, i);
            left++;
        } else if(currElem === 2){
            swapNumbers(nums, i, right);
            right--;
        } else {
            i++
        }
        if(i<left) i=left;
    }
}

const colours = [2,0,2,1,1,0];
sortColors(colours);
console.log(colours)