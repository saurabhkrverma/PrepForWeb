class Node {
    constructor(value) {
        this.value = value;
        this.isEnd = false;
        this.children = {}
    }
}

class Trie {
    constructor() {
        this.root = new Node(null);
    }

    insert(word) {
        const chars = word.split("");
        let current = this.root;
        for(let i=0; i<chars.length; i++){
            const char = chars[i].toUpperCase();
            if(!current.children[char]){
                current.children[char] = new Node(char);
            }
            current = current.children[char];
        }
        current.isEnd = true;
    }

    search(word) {
        // easy
    }

    delete() {

    }
}

const trie = new Trie();


trie.insert("CAT");
trie.insert("CATch");
trie.insert("Bat");


console.log(JSON.stringify(trie));
