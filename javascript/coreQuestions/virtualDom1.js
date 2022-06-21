// ref: https://bigfrontend.dev/problem/Virtual-DOM-I

const html = document.createElement('div');
html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`

/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
    if(element === null || element === undefined){
        return;
    }
    let node = {}
    node.type = (element.nodeName || "").toLowerCase();
    node.props = {}
    if (element.hasAttributes()) {
        for (let { name, value } of element.attributes) {
            node.props[name == 'class' ? 'className' : name] = value;
        }
    }
    if(element.hasChildNodes()){
        node.props.children = Object.keys(element.childNodes).map((index)=>{
            let elem = element.childNodes[index];
            if (elem.nodeType === 1) {
                return virtualize(elem);
            } else if (elem.nodeType === 3) {
                return elem.textContent;
            }
        })
    }

    if (node.props.children && node.props.children.length) {
        if (node.props.children.length == 1) {
            node.props.children = node.props.children[0];
        }
    }

    return node;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
    let { type, props: { className, children, ...restProps } } = obj;
    let node = document.createElement(obj.type);

    // append className
    if(className){
        node.classList.add(className);
    }

    // append children
    if(children){
        if(!(children instanceof Array)){
            children = [children];
        }
        children.forEach((child)=>{
            if(typeof child === "string"){
                const textNode = document.createTextNode(child)
                node.append(textNode);
            } else {
                node.append(render(child));
            }
        })
    }

    // add rest props to ele
    if(restProps){
        Object.entries(restProps).forEach(([key, value])=>{
            ele.setAttribute(key, value);
        })
    }

    return node;
}
