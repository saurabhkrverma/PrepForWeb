// ref: https://bigfrontend.dev/problem/remove-characters

// todo: remove characters with same sufix like ab & abc;

function removeChars(input) {

    const stack = [];

    for(let i = 0; i < input.length; i++) {
        let character = input[i];
        if(character === 'b'){
            // do nothing
        } else if( character === 'c' && stack.length>0 && stack[stack.length-1] === 'a'){
            stack.pop();
        } else {
            stack.push(character);
        }
    }

    return stack.join("")
}

console.log(removeChars('cabbaabcca'));
