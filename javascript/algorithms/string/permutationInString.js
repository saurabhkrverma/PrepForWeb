// ref: https://leetcode.com/problems/permutation-in-string/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
let checkInclusion = function(s1, s2) {

    if(s1.length>s2.length){
        return false
    }

    let map = {};

    for(let i=0; i < s1.length; i++){
        map[s1[i]] = (map[s1[i]] !== undefined) ? ++map[s1[i]] : 1;
        map[s2[i]] = (map[s2[i]] !== undefined) ? --map[s2[i]] : -1;
    }

    if (checkZeros(map)) return true;

    for(let i=s1.length; i< s2.length; i++){
        map[s2[i]] = (map[s2[i]] !== undefined) ? --map[s2[i]] : -1;
        map[s2[i-s1.length]] = (s2[i-s1.length] !== undefined) ? ++map[s2[i-s1.length]] : 1;
        if (checkZeros(map)) return true;
    }
    return false;
};


const checkZeros = (map) => {
    let result = true;
    // check for all zeros
    for (let key in map) {
        if (map[key] !== 0){
            result = false
            break;
        }
    }
    return result;
}

const str1 = "ab";
const str2 = "cab";

console.log(checkInclusion(str1,str2)); // expected: true
