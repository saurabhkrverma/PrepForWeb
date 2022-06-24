// ref: https://leetcode.com/problems/reverse-words-in-a-string-iii/


/**
 * @param {string} s
 * @return {string}
 */
let reverseWords = function(s) {
    let words = s.split(" ");
    words = words.map((word)=> word.split("").reverse().join(""));
    return words.join(" ");

};
console.log(reverseWords("god ding"));
