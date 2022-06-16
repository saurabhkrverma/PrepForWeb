// ref:https://bigfrontend.dev/problem/semver-compare


/**
 * @param {string} v1
 * @param {string} v2
 * @returns 0 | 1 | -1
 */
function compare(v1, v2) {
    const [ v1Major,v1Minor, v1Patch ] = v1.split('.').map(Number);
    const [ v2Major,v2Minor, v2Patch ] = v2.split('.').map(Number);

    if(v1Major !== v2Major){
        return (v1Major > v2Major)? 1 : -1;
    } else if( v1Minor !== v2Minor) {
        return (v1Minor > v2Minor)? 1 : -1;
    } else if( v1Patch !== v2Patch) {
        return (v1Patch > v2Patch)? 1 : -1;
    } else {
        return 0;
    }
}


console.log(compare('0.1.100', '0.1.99'));
