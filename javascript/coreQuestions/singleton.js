

const singleton = (function(){
    let instance;

    let Constructor = function (name){
        this.name = name;
    }

    return {
        getInstance: (name)=>{
            if(instance){
                return instance
            } else {
                instance = new Constructor(name);
                return instance;
            }
        }
    }
})();

const first = singleton.getInstance("sanju");
const second = singleton.getInstance("kusum");

console.log(first, second);