class Node {
    constructor(valueue) {
        this.valueue = valueue;
        this.left = undefined;
        this.right = undefined;
    }
}

const nodeA = new Node(1);
const nodeB = new Node(2);
const nodeC = new Node(3);
const nodeD = new Node(4);
const nodeE = new Node(5);
const nodeF = new Node(6);
const nodeG = new Node(7);
const nodeH = new Node(8);
const nodeI = new Node(9);
const nodeJ = new Node(10);
const nodeK = new Node(11);


nodeA.left = nodeB;
nodeA.right = nodeC;
nodeB.right = nodeD;
nodeC.left = nodeE;
nodeD.right = nodeG;
nodeE.left = nodeF;
nodeF.right = nodeH;
nodeG.left = nodeI;
nodeH.right = nodeK;
nodeI.left = nodeJ;

const verticalTreeTraversal = (root, verticalOrder =0, level=0, result = new Map()) => {
    if(!root) {
        return;
    }
    verticalTreeTraversal(root.left, verticalOrder-1, level+1, result);

    let levelMap = result.get(verticalOrder)
    if(levelMap) {
        let nodesArray = levelMap[level];
        if(nodesArray){
            nodesArray.push(root.value)
            // nodesArray.sort((a,b)=>a-b);
        } else {
            nodesArray = [root.value]
        }
        levelMap[level] = nodesArray;
        result.set(verticalOrder, levelMap);
    } else {
        const newLevelMap = {};
        newLevelMap[level] = [root.value];
        result.set(verticalOrder, newLevelMap)
    }


    verticalTreeTraversal(root.right, verticalOrder+1, level+1, result);

    return result;

}

function traverse(root) {
    const verticalOrder = new Map([...verticalTreeTraversal(root).entries()].sort((a,b)=>{
        return a[0]-b[0]
    }));
    let result = [];
    for(let [key, value] of verticalOrder.entries()){
        for(let level in value) {
            result = [...result, ...value[level]]
        }
    }
    return result
}

// console.log(JSON.stringify(nodeA))

const test = {"value":1,"left":{"value":3,"left":null,"right":{"value":4,"left":{"value":6,"left":{"value":14,"left":null,"right":null},"right":{"value":12,"left":null,"right":null}},"right":{"value":13,"left":{"value":10,"left":null,"right":null},"right":null}}},"right":{"value":2,"left":{"value":5,"left":{"value":7,"left":null,"right":{"value":11,"left":null,"right":null}},"right":{"value":8,"left":{"value":9,"left":null,"right":null},"right":null}},"right":null}}




console.log(verticalTreeTraversal(test));

// console.log(traverse(test));
