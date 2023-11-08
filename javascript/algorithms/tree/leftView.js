// https://leetcode.com/problems/binary-tree-right-side-view/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }
}

const nodeA = new Node('a');
const nodeB = new Node('b');
const nodeC = new Node('c');
const nodeD = new Node('d');
const nodeE = new Node('e');
const nodeF = new Node('f');

nodeA.left = nodeB;
nodeA.right = nodeC;


nodeB.left = nodeD;
nodeB.right = nodeE;

nodeC.left = nodeF;


// console.log(nodeA);


/**
 * @param {Node} root
 * @returns {Node[]}
 * */
const levelOrderTraversal = (root) => {
    const order = [];
    const result = [];
    order.push(root);
    order.push(null);

    while(order.length > 0) {
        const currNode = order.shift();
        result.push(currNode);
        if(currNode === null){
            // new level
            // push marker only if nodes are left to be processed
            if(order.length>0){
                order.push(null);
            }
        } else {

            const leftChild = currNode.left;
            const rightChild = currNode.right;

            if(leftChild){
                order.push(leftChild);
            }
            if(rightChild){
                order.push(rightChild)
            }
        }
    }

    return result;
}

/**
 * @param {Node} root
 * @return {Node[]}
 */
let leftSideView = function(root) {
    // using level order traversal
    const levelOrder = levelOrderTraversal(root);
    const leftView = [root];

    for(let i=1; i<levelOrder.length; i++){
        const currNode = levelOrder[i];
        if(currNode === null){
            leftView.push(levelOrder[i+1]);
        }
    }

    return leftView;
};

console.log(leftSideView(nodeA));