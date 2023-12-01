// https://bigfrontend.dev/problem/most-frequently-occurring-character

/**
 * @param {string} str
 * @returns {string | string[]}
 * */

function count(str) {
    const map = [];
    let max = Math.max();
    let result = [];

    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i];
        if (map[currentChar]) {
            map[currentChar] = ++map[currentChar];

        } else {
            map[currentChar] = 1;
        }

        max = Math.max(max, map[currentChar]);
    }
    for(let char in map){
        if(map[char] === max){
            result.push(char);
        }
    }
    return result.length > 1 ? result : result[0];
}

console.log(count('abbccc'))
console.log(count('abbcccddd'))