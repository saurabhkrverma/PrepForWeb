// ref:https://leetcode.com/problems/largest-number/


/**
 * @param {number[]} nums
 * @return {string}
 */
let largestNumber = function(nums) {

    nums.sort((num1, num2)=>{
        const num1num2 = String(num1) + String(num2);
        const num2num1 = String(num2) + String(num1);
        return (Number(num1num2) > Number(num2num1)) ? -1 : 1
    });

    let result =  nums.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue
    },"");

    if (result.charAt(0) === "0") return "0";
    return result;

};


console.log(largestNumber([0,0]))
