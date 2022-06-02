// ref: https://leetcode.com/problems/sort-colors/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let sortColors = function(nums) {
    let left = 0;
    let right = nums.length-1;
    for(let i = 0; i< nums.length;){

        if(left >= right || i > right) {
            break;
        }

        if(nums[i] === 2){
            let temp = nums[right];
            nums[right] = nums[i];
            nums[i] = temp;
            right--;
        } else if(nums[i]===0){
            let temp = nums[left];
            nums[left] = nums[i];
            nums[i] = temp;
            i++;
            left++;
        } else {
            i++
        }
    }
};

const nums = [2,0,2,1,1,0];
sortColors(nums);
console.log(nums);
