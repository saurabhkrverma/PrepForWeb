// ref: https://www.dofactory.com/javascript/design-patterns/observer

function ObserverList(){
    this.observerList = [];
}

ObserverList.prototype.addObserver = function(observer){
    this.observerList.push(observer);
}

ObserverList.prototype.removeObserver = function(observer){
    this.observerList = this.observerList.filter((currObserver)=>{
        return !(currObserver.id === observer.id);
    })
}

ObserverList.prototype.getObserverAtIndex = function(index){
    return this.observerList[index];
}

ObserverList.prototype.count = function() {
    return this.observerList.length;
}

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer){
    this.observers.addObserver(observer);
};

Subject.prototype.removeObserver = function(observer){
    this.observers.removeObserver(observer);
}

Subject.prototype.notify = function(args) {
    const totalObservers = this.observers.count();
    for(let i=0; i<totalObservers; i++){
        const currentObserver = this.observers.getObserverAtIndex(i)
        currentObserver.notify(args);
    }
}

function Observer(){
    if(Observer._id){
        Observer._id++;
    } else {
        Observer._id = 1;
    }
    this.id = Observer._id;
}

Observer.prototype.notify = (...args) =>{
    console.log(args);
}


const subject1 = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject1.addObserver(observer1);
subject1.addObserver(observer2);

subject1.notify("hello world");

subject1.removeObserver(observer2);

subject1.notify("hello world");
