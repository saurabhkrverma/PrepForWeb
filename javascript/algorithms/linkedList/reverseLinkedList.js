// ref: https://leetcode.com/problems/reverse-linked-list/

class Node {
    constructor (data, next=null){
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insert = (data)=>{
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
}


const myLL = new LinkedList();
myLL.insert(1);
myLL.insert(2);
myLL.insert(3);
myLL.insert(4);
myLL.insert(5);


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function(head) {
    let prev = null;
    while(head){
        const next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
};


console.log(reverseList(myLL.head));
