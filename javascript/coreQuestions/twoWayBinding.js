// ref: https://bigfrontend.dev/problem/two-way-binding


/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
    element.value = state.value;
    element.addEventListener("change",()=>{
        state.value = element.value;
    });

    Object.defineProperty(state,'value', {
        get: () => element.value,
        set: (value) => element.value = value,
    });
}
