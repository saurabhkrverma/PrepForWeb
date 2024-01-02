class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper function to find the closest non-zero leaf value
const findClosestLeaf = (node) => {
    if (!node) {
        return Infinity;
    }

    if (node.val !== 0) {
        return node.val;
    }

    const left = findClosestLeaf(node.left);
    const right = findClosestLeaf(node.right);

    return Math.min(left, right);
};

// Helper function to swap zeros with their closest non-zero leaf values
const swapZeroWithClosestLeaf = (node, closest) => {
    if (!node) {
        return;
    }

    if (node.val === 0) {
        node.val = closest;
    }

    swapZeroWithClosestLeaf(node.left, closest);
    swapZeroWithClosestLeaf(node.right, closest);
};

// Main function to swap zeros with closest non-zero leaf values in the binary tree
const closestNonZeroLeaf = (root) => {
    const traverse = (node) => {
        if (!node) {
            return;
        }

        const closest = findClosestLeaf(node);
        swapZeroWithClosestLeaf(node, closest);

        traverse(node.left);
        traverse(node.right);
    };

    traverse(root);
    return root;
};

// Example usage:
// Create a sample binary tree
const root = new TreeNode(2);
root.left = new TreeNode(0);
root.right = new TreeNode(0);
root.left.left = new TreeNode(1);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(5);
root.right.left.right = new TreeNode(6);

// Function to print the tree in-order
const printTree = (root) => {
    if (root) {
        printTree(root.left);
        console.log(root.val);
        printTree(root.right);
    }
};

console.log("Original Tree:");
printTree(root);
console.log("\n");

// Swap zeros with closest non-zero leaf values
const newRoot = closestNonZeroLeaf(root);

console.log("Tree after swapping zeros with closest non-zero leaf values:");
printTree(newRoot);
