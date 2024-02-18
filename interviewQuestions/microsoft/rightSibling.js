// ref https://bigfrontend.dev/problem/Next-Right-Sibiling


/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
    const queue = [];
    queue.unshift(root);
    queue.unshift(null);

    let nextSibling = null;
    while(queue.length>0){
        const currElem = queue.shift();
        if(currElem === null || currElem === undefined){
            // new level
            continue;
        }
        if(currElem === target){
            // check if there is a right sibling
            const sibling = queue[0];
            if(sibling !== null && sibling !== undefined){
                nextSibling = sibling;
                break;
            }
        }
        queue.push(...currElem.children);
    }
    return nextSibling;
}