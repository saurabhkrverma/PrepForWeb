// ref: https://leetcode.com/problems/decode-string/
// ref: https://bigfrontend.dev/problem/uncompress-string

/**
 * @param {string} str
 * @return {string}
 */
let getString = (str) => {
    let num = Number(str.match(/^\d+/)[0]);
    let subStr = str.match(/\w+/g)[1];
    let result = '';
    while (num > 0) {
        result = result + subStr;
        num = num - 1;
    }
    return result
}

/**
 * @param {string} s
 * @return {string}
 */
let decodeString = function(str) {
    // find the groups with no nesting
    const simpleGroups = str.match(/(\d+\[\w+\])/g);
    if(simpleGroups === null || simpleGroups.length === 0){
        return str;
    }
    for(let i=0 ; i < simpleGroups.length; i++){
        const decodedGroup = getString(simpleGroups[i]);
        str =str.replace(simpleGroups[i],decodedGroup);
    }
    return decodeString(str);
};

console.log(decodeString("3[a]"))
console.log(decodeString("3[a]2[b]"))
console.log(decodeString("3[a2[b]]"))
console.log(decodeString("100[leet]"));
