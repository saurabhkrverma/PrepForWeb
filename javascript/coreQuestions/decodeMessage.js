// ref:https://bigfrontend.dev/problem/decode-message

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
