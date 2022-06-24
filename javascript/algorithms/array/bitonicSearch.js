// ref: https://www.geeksforgeeks.org/find-element-bitonic-array/

/**
 * @param {number[]} nums
 * @return {number}
* */
let findPivot = (nums) => {

    let pivot = -1;
    let start = 0;
    let end = nums.length-1;
    if(start >= end){
        return pivot;
    }

    const mid = Math.floor(end/2);
    // check if mid is the pivot element
    if(nums[mid] > nums[mid+1]){
        return mid;
    } else if(nums[mid-1] > nums[mid]) {
        return mid-1
    }else if(nums[mid] < nums[end]) {
        // go left
        return findPivot(nums.splice(0,mid));
    } else {
        let rightIndex = findPivot(nums.splice(mid+1));
        return (rightIndex>=0) ? (mid + 1 + rightIndex) : -1;
    }
}

/**
* @param {number[]} nums
* @param {number} target
* @return {number}
* */
let findElement = (nums,targer)=>{

}

const nums1 = [1,2,3,4,5,6,7];
const nums2 = [6,7,1,2,3,4,5];
const nums3 = [3,4,5,6,7,1,2];

console.log(findPivot(nums1));
console.log(findPivot(nums2));
console.log(findPivot(nums3));

