
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(root) {
    const tagSet = new Set()
    // traverse through the whole dom
    let nodes = [];
    nodes.push(root);
    while (nodes.length > 0) {
        const node = nodes.shift();
        tagSet.add(node.tagName.toLowerCase());
        for(let i=0; i<node.children.length; i++){
            nodes.push(node.children[i]);
        }
    }
    return [...tagSet]
}