class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function deserializeLevelOrder(arr) {
    if (arr.length === 0) {
        return null;
    }

    const root = new TreeNode(arr.shift());
    const queue = [root];

    while (queue.length > 0) {
        const current = queue.shift();

        if (arr.length > 0) {
            const leftVal = arr.shift();
            if (leftVal !== null) {
                current.left = new TreeNode(leftVal);
                queue.push(current.left);
            }
        }

        if (arr.length > 0) {
            const rightVal = arr.shift();
            if (rightVal !== null) {
                current.right = new TreeNode(rightVal);
                queue.push(current.right);
            }
        }
    }

    return root;
}

// Test the deserialize function
const levelOrder = [1,3,2,null,4,5,null,6,13,7,8,14,12,10,null,null,11,9];
const root = deserializeLevelOrder(levelOrder);
console.log(JSON.stringify(root)); // The root of the deserialized binary tree