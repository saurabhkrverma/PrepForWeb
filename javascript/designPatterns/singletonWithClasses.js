// ref: https://www.dofactory.com/javascript/design-patterns/singleton

class MyClass {
    constructor() {
        this.name = "saurabh";
        if (MyClass._instance) {
            return MyClass._instance
        }
        MyClass._instance = this;
        // ... Your rest of the constructor code goes after this
    }
    getInstance = () => {
        return MyClass._instance;
    }
}

const foo = new MyClass();
const woo = new MyClass();
console.log(foo,woo,(foo===woo));
