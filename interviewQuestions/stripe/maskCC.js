// mask cc number which is of length 13 or 16 with X leaving last 4 digits as is


const maskMatch = (ccNum) => {
    ccNum = ccNum.replace(/\s/gm, "");
    const length = ccNum.length;
    if(length === 13){
        ccNum = ccNum.replace(/\d{9}/gm, "XXXXXXXXXX");
    } else {
        ccNum = ccNum.replace(/\d{12}/gm, "XXXXXXXXXXXX")
    }
    return ccNum;
}

/**
 * @param {string} str
 * @return {string}
 * */
const redact_card_numbers = (str) => {
    const regexp = /(\s\d{16}$)|(\s?\d{16}\s)|(\s\d{13}\s)|(\s\d{13}$)/gm;
    const matches = str.match(regexp) || [];
    matches.forEach((match, index)=>{
        const ind = str.indexOf(match);
        const length = match.length;
        str = str.slice(0,ind) + " " + maskMatch(match) + " " + str.slice(ind+length);
    })
    return str.replace(/(^\s)|(\s$)/gm, "");
}

// this should have been the answer, I gave the first one and ended up taking all the time in writing such small function.
const redact_card_numbers_2 = (str) => {
    let tokens = str.split(" ");
    tokens = tokens.map((token)=>{
        if(token.length === 13 && (/(\d{13})/gm).test(token)) {
            token = token.replace(/\d{9}/gm, "XXXXXXXXXX");
        } else if(token.length === 16 && (/(\d{16})/gm).test(token)) {
            token = token.replace(/\d{12}/gm, "XXXXXXXXXXXX")
        }
        return token
    })
    console.log(tokens.join(" "))
}

console.log(redact_card_numbers_2("an embedded number 1234567890123456 in the string"));
console.log(redact_card_numbers_2("12345678a90123456 is a number"));
console.log(redact_card_numbers_2("number 123456-7890123456"));
console.log(redact_card_numbers_2("an embedded number 123456780123456 in the string"));
console.log(redact_card_numbers_2("an embedded number 1234567801234569 & 1234567890123 in the string"));
