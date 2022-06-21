// ref: https://leetcode.com/problems/binary-search/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function(nums, target) {
    let start = 0;
    let end = nums.length-1;
    if(start === end){
        return (nums[start]===target)? start : -1;
    } else if(start>end){
        return -1;
    }
    const mid = Math.floor(end/2);
    if(target === nums[mid]) {
        return mid;
    } else if (nums[mid] < target) {
        // go right
        let rightIndex = binarySearch(nums.splice(mid+1),target);
        return (rightIndex>=0) ? (mid + 1 + rightIndex) : -1;
    } else {
        // go left
        return binarySearch(nums.splice(0,mid),target);
    }
};

console.log(binarySearch([0,1,2,3,4,5],-1));
console.log(binarySearch([0,1,2,3,4,5],0));
console.log(binarySearch([0,1,2,3,4,5],1));
console.log(binarySearch([0,1,2,3,4,5],2));
console.log(binarySearch([0,1,2,3,4,5],3));
console.log(binarySearch([0,1,2,3,4,5],4));
console.log(binarySearch([0,1,2,3,4,5],5));
console.log(binarySearch([0,1,2,3,4,5],6));
