// ref: https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/description/

/**
 * @param {string} number
 * @param {character} digit
 * @return {string}
 */
let removeDigit = function(number, digit) {
    let candidate = -1;
    let digits = number.split("");
    for(let i=0; i<digits.length; i++){
        if(digits[i] === digit){
            candidate = i;
        } else {
            const currentNumber = Number(digits[i]);
            const currentCandidate = (candidate >= 0) ? Number(digit) : -1;
            if(candidate >= 0 && candidate+1 === i &&  currentNumber > currentCandidate) {
                // finalise this candidate;
                break;
            }
        }
    }
    if(candidate >= 0){
        digits.splice(candidate,1);
    }
    return digits.join("");
};

console.log(removeDigit("47542","4"));


