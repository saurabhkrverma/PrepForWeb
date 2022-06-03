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
console.log(myLL)
