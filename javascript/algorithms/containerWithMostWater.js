// ref: https://leetcode.com/problems/container-with-most-water/

/**
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function(height) {
   let maxArea = Math.max();
   let left = 0;
   let right = height.length-1;
   while(left<right){
      const currentArea = (right-left) * Math.min(height[left], height[right]);
      maxArea = (currentArea > maxArea) ? currentArea : maxArea;
      if(height[left]<height[right]){
         left++;
      } else {
         right--;
      }
   }
   return maxArea;
};


console.log(maxArea([1,8,6,2,5,4,8,3,7]))
