// https://bigfrontend.dev/problem/get-DOM-tree-height


/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
    if(!root){
        return 0
    }

    let tempHeight=0;
    for(let i=0; i< tree.children.length; i++){
        tempHeight = Math.max(tempHeight,getHeight(tree.children[i]));
    }

    return tempHeight + 1;
}