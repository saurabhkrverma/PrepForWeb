// ref: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/


/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */

const binarySearch = (nums, target, start, end) => {
    if(start>=end){
        // check if that number is same as target
        return (nums[start] === target) ? [start,start]: [-1,-1];
    }

    const mid = Math.floor((end-start+1)/2) + start;
    if(nums[mid]===target){
        let low, high;
        // check for low
        if(nums[mid-1] === target){
            low = binarySearch(nums, target, start, mid-1)[0];
        } else {
            low = mid;
        }
        // check for high
        if(nums[mid+1] === target){
            high = binarySearch(nums, target, mid+1, end)[1];
        } else {
            high = mid;
        }
        return [low,high];
    } else {
        if(nums[mid]>target){
            // go left
            return binarySearch(nums, target, start, mid-1);
        } else {
            // go right
            return binarySearch(nums, target, mid+1, end);
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let searchRange = function(nums, target) {
    const result = binarySearch(nums, target, 0, nums.length-1);
    return result;
};

const sampleInput = [0,0,1,1,1,2,2,3,3,3,4,4,4,4,5,5,6,6,6,8,10,10];
console.log(searchRange(sampleInput,4)); //expected output : 3,4
