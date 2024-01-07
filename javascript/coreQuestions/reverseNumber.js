// reverse a given number without converting it to string

const reverseNumber = (number) => {
    let result = "";
    while(number>0) {
        const reminder = number%10;
        result = result + reminder;
        number  = Math.floor(number/10);
    }
    return Number(result);
}

console.log(reverseNumber(123));