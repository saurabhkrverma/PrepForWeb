// ref: https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function(s) {
   let map = {},
       low = 0,
       max = 0,
       high = 0;

   while(high<s.length){

       let char = s[high];
       if(map[char] === undefined){
           map[char] = high;

       } else {
           const temp = map[char] + 1;
           low = (low < temp) ? temp : low;
           map[char] = high;
       }
       max= Math.max(max,high-low+1);
       high++;
   }
    return max;
};

const input1 = "abba";
console.log(lengthOfLongestSubstring(input1));


