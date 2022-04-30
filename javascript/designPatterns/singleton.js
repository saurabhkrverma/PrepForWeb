// ref: https://www.dofactory.com/javascript/design-patterns/singleton

const Singleton = (function(){
    let instance;
    function createInstance(){
        this.sayHello = function(name='world'){
            console.log(`hello ${name}`);
        }
    }
    return {
        getInstance: function() {
            if(!instance){
                instance = new createInstance()
            }
            return instance;
        }
    }
})();



const foo = Singleton.getInstance();
const woo = Singleton.getInstance();
console.log(foo,woo,(foo===woo));


