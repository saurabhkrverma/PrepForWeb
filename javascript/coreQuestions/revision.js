const populateAllKeys = (root, path="") => {
    console.log('coming for', root, path)
    //base condition
    if(!root || typeof root === "string") {
        console.log('base condition', root, path)
        return [path];
    }

    return Object.keys(root).map((key)=> {
        if(!path) {
            return populateAllKeys(root[key], `${key}`)
        }
        return populateAllKeys(root[key], `${path}.${key}`)
    }).flat(Infinity);
}
const obj = {
    a: {
        b: "hi",
        c: "hello"
    }
}
// console.log(populateAllKeys(obj))
console.log(populateAllKeys({a: "hi"}));