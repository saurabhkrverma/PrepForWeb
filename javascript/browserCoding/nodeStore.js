// https://bigfrontend.dev/problem/create-a-simple-store-for-DOM-node

class NodeStore {
    constructor() {
        this.store = []
    }

    /**
     * @param {Node} node
     * @param {any} value
     */
    set(node, value) {
        this.store[node] = value;
    }
    /**
     * @param {Node} node
     * @return {any}
     */
    get(node) {
        return this.store[node]
    }

    /**
     * @param {Node} node
     * @return {Boolean}
     */
    has(node) {
        return !!this.store[node]
    }
}