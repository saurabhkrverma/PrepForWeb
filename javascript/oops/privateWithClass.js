
class Person {
    #privateName
    constructor (name) {
        this.#privateName = name
    }

    sayHello () {
        console.log(`Hello this is ${this.#privateName}`)
    }
}


class AnotherPerson {

    constructor(name) {
        let _name = name;
        this.getName = function(){
            return _name;
        }
    }

    sayHello  = () => {
        console.log(`Hello this is ${this?.getName()}`)
    }
}


const Foo = new AnotherPerson("Sanju");
const Woo = new AnotherPerson("Billu");

Foo.sayHello();
Woo.sayHello();

