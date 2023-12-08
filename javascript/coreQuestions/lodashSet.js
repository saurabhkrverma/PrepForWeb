// https://bigfrontend.dev/problem/lodash-set


/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 */
function set(obj, path, value) {
    if(!obj) {
        throw(new Error('source undefined'))
    }
    let result = obj;
    const keys = (typeof path === 'string') ? path.replace(/\[/gm,'.#').replace(/]/,'').split('.') : path;
    let i=0;
    for(i=0; i<keys.length-1; i++){
        const key = keys[i].replace(/#/gm,'');
        console.log('key', key);
        if(result[key]) {
            result = result[key];
        } else {
            // if(isNaN(Number(keys[i+1]))) {
            if(/#/gm.test(keys[i+1])){
                result[key]=[];
            } else {
                result[key]={}
            }
            result = result[key]
        }
    }

    if(result) {
        result[keys[i].replace(/#/gm,'')] = value;
    }
}


const obj = {
    a: {
        b: {
            c: [1,2,3]
        }
    }
}
// set(obj, 'a.c.d.01', 'BFE')
// console.log(obj);

// set(obj, 'a.b.c', 'BFE')
// console.log(obj.a.b.c) // "BFE"
//
// set(obj, 'a.b.c.0', 'BFE')
// console.log(obj.a.b.c[0]) // "BFE"
//
set(obj, 'a.b.c[1]', 'BFE')
console.log(obj.a.b.c[1]) // "BFE"
//
// set(obj, ['a', 'b', 'c', '2'], 'BFE')
// console.log(obj.a.b.c[2]) // "BFE"
//
// set(obj, 'a.b.c[3]', 'BFE')
// console.log(obj.a.b.c[3]) // "BFE"
//
// set(obj, 'a.c.d[0]', 'BFE')
// // valid digits treated as array elements
// console.log(obj.a.c.d[0]) // "BFE"
//
// set(obj, 'a.c.d.01', 'BFE')
// // invalid digits treated as property string
// console.log(obj.a.c.d['01']) // "BFE"