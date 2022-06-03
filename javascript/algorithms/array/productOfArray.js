// ref: https://leetcode.com/problems/product-of-array-except-self/


/**
 * @param {number[]} nums
 * @return {number[]}
 */
let productExceptSelf = function(nums) {
    const prefix = [];
    const postfix = []
    const result = [];
    let productSoFar = 1;
    for (let i = 0; i < nums.length; i++) {
        prefix[i] = productSoFar
        productSoFar *= nums[i]
    }

    productSoFar = 1
    for (let j = nums.length-1; j >= 0; j--) {
        postfix[j] = productSoFar
        productSoFar *= nums[j]
    }

    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix[i] * postfix[i]
    }

    return result;
};

productExceptSelf([1,2,3,4]);
