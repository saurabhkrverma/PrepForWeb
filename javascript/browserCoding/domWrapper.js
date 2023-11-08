// https://bigfrontend.dev/problem/implement-a-simple-DOM-wrapper-to-support-method-chaining-like-jQuery


/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
    let htmlElem = el;

    const cssWrapper = {
        css: (propertyName, value)=>{
            htmlElem.style[propertyName] = value;
            return cssWrapper;
        }
    }
    const wrapper = () => {
        return cssWrapper
    }

    return wrapper();
}