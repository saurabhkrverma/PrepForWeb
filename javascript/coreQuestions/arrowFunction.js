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
