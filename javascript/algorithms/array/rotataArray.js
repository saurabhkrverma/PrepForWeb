// ref:https://leetcode.com/problems/rotate-array/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// on leetcode this solution exceeds the time limit
let rotate1 = function(nums, k) {
    while(k>0){
        const currNum = nums.pop();
        nums.unshift(currNum);
        k--;
    }
};

// still exceeding the time limit
let rotate2 = function(nums, k) {
    let numOfRotations = k % nums.length;
    nums.unshift(...nums.splice(nums.length - k));
};




