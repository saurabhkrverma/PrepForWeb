// ref: https://leetcode.com/problems/minimum-size-subarray-sum/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function(target, nums) {
    let result = Math.min();
    let left = 0;
    let currentSum = 0;
    let skipIt = false;
    for(let i=0; i<nums.length;){
        // check for individual number
        if(nums[i] >= target) {
            result = 1;
            break;
        }
        if(!skipIt){
            currentSum = currentSum + nums[i];
        }
        if(currentSum >= target){
            result = Math.min(result, (i-left+1));
            currentSum = currentSum - nums[left];
            left++;
            skipIt = true;
        } else {
            skipIt = false;
            i++;
        }
    }
    return (result === Math.min()) ? 0 : result;
};

console.log(minSubArrayLen(11, [1,2,3,4,5]))
