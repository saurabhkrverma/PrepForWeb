// https://leetcode.com/problems/reverse-string/submissions/

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let low = 0,
        high = s.length-1;

    while(low<high){
        const temp = s[low];
        s[low] = s[high];
        s[high] = temp;
        low++;
        high--;
    }

    return s
};
