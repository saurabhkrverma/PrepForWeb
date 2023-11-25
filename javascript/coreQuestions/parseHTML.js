// https://bigfrontend.dev/problem/extract-all-anchor-elements-from-HTML-string

/**
 * @param {string} str
 * @return {string[]}
 * */
const parseHTML = (str) => {
    const regexp = /<a(\s[^>]*)?>.*?(<\s*\/\s*a>)/gm;
    const matches = str.match(regexp);
    return matches || [];
}

const str= '<div>\n' +
    '    <a>link1< / a><a href="https://bfe.dev">link1< / a>\n' +
    '    <div<abbr>bfe</abbr>div>\n' +
    '    <div>\n' +
    '<abbr>bfe</abbr><a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  class="i">i</span>   nk2   </a>\n' +
    '    </div>\n' +
    '</div>';

console.log(parseHTML(str))