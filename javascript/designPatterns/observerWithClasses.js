// ref: https://www.dofactory.com/javascript/design-patterns/observer

class ObserverList {
    constructor() {
        this.observerList = [];
    }

    addObserver(observer){
        this.observerList.push(observer);
    }

    removeObserver(observer){
        this.observerList = this.observerList.filter((currObserver)=>{
            return !(currObserver.id === observer.id);
        })
    }

    getObserverAtIndex(index){
        return this.observerList[index];
    }

    count(){
        return this.observerList.length;
    }
}


class Subject {

    constructor() {
        this.observers = new ObserverList();
    }

    addObserver(observer) {
        this.observers.addObserver(observer);
    }

    removeObserver(observer) {
        this.observers.removeObserver(observer);
    }

    notify(args) {
        const totalObservers = this.observers.count();
        for(let i=0; i<totalObservers; i++){
            const currentObserver = this.observers.getObserverAtIndex(i)
            currentObserver.notify(args);
        }
    }

}

class Observer {
    constructor() {
        if(Observer._id){
            Observer._id++;
        } else {
            Observer._id = 1;
        }
        this.id = Observer._id
    }

    notify(...args){
        console.log(args);
    }
}


const subject1 = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();


subject1.addObserver(observer1);
subject1.addObserver(observer2);

subject1.notify("hello world");

subject1.removeObserver(observer2);

subject1.notify("hello world");

