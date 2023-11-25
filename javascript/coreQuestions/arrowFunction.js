class Person {
    constructor(name) {
        this.name = name;
        this.greet = function(){
            console.log("Hello", this.name);
        }
        this.utils = {
            greet: function(){
                // will give undefined as it would pass utils as this object
                console.log("Hello", this.name);
            },
            greetNew: ()=>{
                // will work as expected as it is lexically scoped and this will point ot instance of class test
                console.log("Hello", this.name);
            }
        }
    }
}


const saurabh = new Person("saurabh");

saurabh.greet()
saurabh.utils.greet();
saurabh.utils.greetNew();



class AnotherPerson {
    constructor(name) {
        this.name = name;
    }

    sayHello (){
        console.log(`Hello this is ${this?.name}`)
    }

    sayHi = () => {
        console.log(`Hello this is ${this?.name}`)
    }
};

const Billu = new AnotherPerson("Billu");
Billu.sayHello()
const helloRef = Billu.sayHello;
helloRef(); // this wont print anything as 'this' will now ref tp window object which doesn't have that property
Billu.sayHi();
const hiRef = Billu.sayHi;
hiRef(); // since this is lexically scoped to AnotherPerson, will work as expected
