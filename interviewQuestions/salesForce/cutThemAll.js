// There is an automated cutting machine, it cuts on the marks made on the rod
// but in order to be cut by the machine, rod must have a min length
// you're given an array of cut sequence and min length
// return true if cutting is possible, else false

const cut_1 = [4,3,2];
const minLength_1 = 7;

const cutThemAll = (cuts, minLength) => {
    let totalLength = cuts.reduce((acc,cut)=>acc+cut, 0);
    let currentCut = 0;
    for(let i=0; i<cuts.length; i++){
        currentCut = currentCut + cuts[i];
        if(totalLength-currentCut > minLength) {
            totalLength = totalLength-currentCut;
            currentCut = 0;
        } else if(currentCut > minLength) {
            totalLength = totalLength-currentCut;
            break;
        }
    }
}
