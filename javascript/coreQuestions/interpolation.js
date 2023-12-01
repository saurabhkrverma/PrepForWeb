//https://bigfrontend.dev/problem/interpolation

/**
 * @param {string} translation
 * @param {object} data
 * @returns {string}
 */
function t(translation, data={}) {
    const keys = Object.keys(data);
    keys.forEach((key)=>{
        const regex = new RegExp(`{{${key}}}`);
        translation = translation.replace(regex, data[key])
    });
    return translation.replace(/{{[\w]*}}/gm, '');
}

console.log(t(
    '{{website}} {{verb}} {{evaluation}} {{period}}',
    { website: 'BFE.dev', evaluation: '面白い'}
));