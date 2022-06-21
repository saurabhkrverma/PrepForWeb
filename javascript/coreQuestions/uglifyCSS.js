// ref: https://bigfrontend.dev/problem/unique-class-name

let updateDigits = (digits) => {
    let current = digits[digits.length-1];
    let digitsExhausted = true;
    for(let i = digits.length-1; i>=0; i--){
        let current = digits[i];
        current++;
        if(current < 123){
            digitsExhausted = false;
            digits[i] = current;
            break;
        } else {
            digits[i] = 97;
        }
    }
    if(digitsExhausted){
        digits.push(97);
    }
    return digits
}



/**
 * @returns {string}
 */

let getUniqueClassName = (()=>{
    let digits = [97];
    const foo = () => {
        let current = digits[digits.length-1];
        if(current === 123) {
            digits = updateDigits(digits);
            current = digits[digits.length-1];
        }
        const char = digits.reduce((prefix,charCode)=>{
            return prefix+String.fromCharCode(charCode);
        },'');
        ++current;
        // update the stack
        digits[digits.length-1] = current;
        return char;
    }
    foo.reset = ()=>{
        digits = [97];
    }
    return foo;
})();

let i=0
while(i<3000){
    console.log(getUniqueClassName());
    i++;
}


// console.log(getUniqueClassName())
// console.log(getUniqueClassName())
// getUniqueClassName.reset();
// console.log(getUniqueClassName())
// console.log(getUniqueClassName())
