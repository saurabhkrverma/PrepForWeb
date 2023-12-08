// https://bigfrontend.dev/problem/implement-lodash-get

/**
 * @param {object} source
 * @param {string} path
 * @param {any} defaultValue
 * @return {any}
 * */
const get = (source, path, defaultValue) => {
    if(!source){
        throw(new Error('source is undefined'));
    }
    let result = source;
    const keys = (typeof path === 'string') ? path.replace(/\[/gm,'.').replace(/]/,'').split('.') : path;
    for(let i=0;i<keys.length;i++){
        const key = keys[i];
        result = result[key];
        if(result === undefined || result === null){
            break;
        }
    }

    return (result===source || result === undefined || result === null) ?  defaultValue: result;
}

const obj = {
    a: {
        b: {
            c: [1,2,3]
        }
    }
}

console.assert(get(obj, 'a.b.c') === obj.a.b.c);

console.log("1",get(obj, 'a.b.c'));
console.log("2",get(obj, 'a.b.c.0'));
console.log("3",get(obj, 'a.b.c[1]'));
console.log("4",get(obj, ['a', 'b', 'c', '2']))
console.log("5",get(obj, 'a.b.c[3]'))
console.log("6",get(obj, 'a.c', 'bfe'));
console.log("7",get(obj, ['a','b','c', '3'], 'bfe'));
