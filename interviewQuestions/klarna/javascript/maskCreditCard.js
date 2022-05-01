/*
Implement a credit card masker that replaces all but the 1st and last 4 digits in the provided sequence
-> Should not mask input shorter than 6 characters
-> Should not mask non-numeric characters
*/


const maskCreditCard = (creditCard = "") => {
    if(creditCard.length < 6){
        //Should not mask input shorter than 6 characters
        return creditCard;
    }
    const creditCardChars = creditCard.split("");
    const maskedCreditCard = creditCardChars.map((char,index)=>{
        if(index === 0 || (creditCardChars.length - index) <= 4 || !Number.isInteger(parseInt(char,10))) {
            // should not mast 1 and last 4 digits
            // should not mask non numeric characters
            return char;
        } else {
            return '#';
        }
    });
    return maskedCreditCard.join("");
}


console.log(maskCreditCard("1256"));
console.log(maskCreditCard("123456789"));
console.log(maskCreditCard("12@.34A56B"));
