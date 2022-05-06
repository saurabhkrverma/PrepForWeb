// ref: https://bigfrontend.dev/problem/serialize-and-deserialize-binary-tree
// ref: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

// This is the class for the node
// you can use this directly as it is bundled with your code

// class Node {
//   value: number
//   left: null | Node
//   right: null | Node
//   constructor(val) {
//     this.value = val
//     this.left = null
//     this.right = null
//   }
// }

class Node {
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}


/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
    const binaryTree = [];
    binaryTree.push(root);
    let i=0;
    while(i<binaryTree.length){
        let currentNode = binaryTree[i];
        if(!currentNode) {
            binaryTree[i] = "null";
        } else {
            const value = currentNode.value;
            const leftIndex = i*2+1;
            const rightIndex = i*2+2;
            binaryTree[i] = value;
            binaryTree[leftIndex] = currentNode.left;
            binaryTree[rightIndex] = currentNode.right;
        }
        i++;
    }
    return binaryTree.toString();
}

/**
 * @param {string} str
 * @return {Node}
 */
function deserialize(str) {
    const binaryTree = str.split(",");
    if (binaryTree.length === 0) {
        return null
    }
    for(let i=binaryTree.length-1; i>=0; i--){
        const currentValue = binaryTree[i];
        if(currentValue === "null"){
            binaryTree[i] = null;
        } else {
            const currentNode = new Node(Number(currentValue));
            currentNode.left = (i*2+1 > binaryTree.length) ? null : binaryTree[i*2+1];
            currentNode.right = (i*2+2 > binaryTree.length) ? null : binaryTree[i*2+2];
            binaryTree[i] = currentNode;
        }
    }
    return binaryTree[0];
}

const root = new Node(1)
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.right.right = new Node(7);

const btString = serialize(root)
console.log(btString);
console.log(deserialize(btString));


