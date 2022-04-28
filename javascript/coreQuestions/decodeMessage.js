// ref:https://bigfrontend.dev/problem/decode-message

//Your are given a 2-D array of characters. There is a hidden message in it.
//
// I B C A L K A
// D R F C A E A
// G H O E L A D
// The way to collect the message is as follows
//
// start at top left
// move diagonally down right
// when cannot move any more, try to switch to diagonally up right
// when cannot move any more, try switch to diagonally down right, repeat 3
// stop when cannot neither move down right or up right. the character on the path is the message
// for the input above, IROCLED should be returned.

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
    if(message.length === 0){
        return "";
    }
    const rows = message.length;
    const cols = message[0].length;
    let result = "";
    let i = 0;
    let j = 0;
    let goingDownwards = true;
    while((i>=0 && i<rows) && (j>=0 && j<cols)) {
        if(message[i][j]) {
            result+=message[i][j];
        }
        if(goingDownwards) {
            if(i+1<rows){
                i++;
                goingDownwards = true;
            } else {
                goingDownwards = false;
                i--;
            }
        } else {
            if(i-1>=0) {
                i--;
                goingDownwards = false;
            } else {
                goingDownwards = true;
                i++;
            }
        }
        j++;
    }
    return result;
}

const message = [
    ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
    ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
    ['G', 'H', 'O', 'E', 'L', 'A', 'D']
]

console.log("result", decode(message));
