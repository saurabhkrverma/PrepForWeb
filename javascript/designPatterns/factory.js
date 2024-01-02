// ref: https://www.dofactory.com/javascript/design-patterns/factory-method
// ref: https://refactoring.guru/design-patterns/factory-method/typescript/example
// ref: https://itnext.io/4-ways-to-implement-factory-pattern-in-javascript-2e019c2a9ada


// class Employee {
//     let _
// }


function EmployeeMaker (name, age)  {
    const id = Math.ceil(Math.random()*10);
    function createInstance () {
        this.name = name;
        this.age = age;
        this.id = id;
    }
    return (function test(){
        return new createInstance()
    })()
}



class Employee {
     #id = Math.ceil(Math.random()*10);

     constructor(name, age) {
         this.name = name;
         this.age = age;
     }

     getId() {
         console.log(this.#id);
     }
}

class FullTimeEmployee extends Employee {
    constructor(name, age) {
        super(name, age);
        this.type = 'Full Time'
    }

    getId() {
        super.getId();
        console.log(`employee type ${this.type}`);
    }
}

const foo = new FullTimeEmployee('saurabh', 34);
console.log(foo);
foo.getId();