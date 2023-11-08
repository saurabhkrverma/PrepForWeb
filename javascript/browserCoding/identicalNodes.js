// https://bigfrontend.dev/problem/find-corresponding-node-in-two-identical-DOM-tree

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

const identifyPath = (root, target, path=[]) => {
    if(!target) {
        return path;
    } else if (target === root) {
        return path
    }

    const parentElem = target.parentElement;
    // run through parents children
    const children = parentElem.children;
    for(let i=0; i<= children.length; i++){
        let child = children[i];
        if(child === target) {
            path.push(i);
            break;
        }
    }

    return identifyPath(root, parentElem, path)
}



/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
    const path = identifyPath(rootA, target);

    let node = rootB;
    for(let i=path.length-1; i>=0; i--){
        node = node.children[path[i]]
    }

    return node;
}

const root = new Node('a');
const nodeB = new Node('b');
const nodeC = new Node('c');
const nodeD = new Node('d');
const nodeE = new Node('e');
const nodeF = new Node('f');

root.children.push(nodeB);
root.children.push(nodeC);
nodeB.children.push(nodeD);
nodeB.children.push(nodeE);
nodeC.children.push(nodeF);

console.log(identifyPath(root, nodeF));
