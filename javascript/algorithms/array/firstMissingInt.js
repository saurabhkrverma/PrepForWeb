// ref: https://leetcode.com/problems/first-missing-positive/

/**
 * @param {number[]} nums
 * @return {number}
 */
let firstMissingPositive = function(nums) {

    for(let i=0; i<nums.length; i++){
        if(nums[i]>0 && nums[i] <= nums.length) {
            nums[nums[i]] = "" + nums[nums[i]];
        }
    }
    let i = 1
    for( ; i<nums.length; i++){
        if(typeof nums[i] !== "string"){
            break;
        }
    }
    return i;
};


console.log(firstMissingPositive([2]))
