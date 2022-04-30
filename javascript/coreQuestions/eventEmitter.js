class Subscriber {
    constructor(func) {
        if(Subscriber._id){
            Subscriber._id+=1;
        } else {
            Subscriber._id = 1;
        }
        this.id = Subscriber._id
        this.callback = func;
    }
}

// please complete the implementation
class EventEmitter {
    constructor(){
        this.topics={};
    }

    subscribe(eventName, callback) {
        if(!this.topics[eventName]){
            // add this topic to the list with no sub
            this.topics[eventName] = [];
        }
        const subscriber = new Subscriber(callback)
        this.topics[eventName].push(subscriber);
        subscriber.topic = eventName;
        subscriber.release = this.release.bind(this,eventName,subscriber.id);
        return subscriber;
    }

    emit(eventName, ...args) {
        if(this.topics[eventName]) {
            // call all subs
            const subs = this.topics[eventName];
            subs.forEach((sub)=>{
                sub.callback(...args);
            });
        } else {
            // add this topic to the list with no subs
            this.topics[eventName] = [];
        }
    }

    release(...args){
        const [topic, subscriberId] = args;
        if(this.topics[topic]){
            let subs = this.topics[topic];
            for(let i=0; i<subs.length; i++){
                const currSub = subs[i];
                if(currSub.id === subscriberId){
                    subs = subs.splice(i,1);
                    break;
                }
            }
        } else {
            console.log("Topic not found");
        }
    }
}

const dummySub = (...args) => {
    console.log("I am a sub1", args);
}

const dummySub2 = (...args) => {
    console.log("I am a sub2", args);
}

const myEventEmitter = new EventEmitter();

const sub1 = myEventEmitter.subscribe("test", dummySub);
const sub2 = myEventEmitter.subscribe("test", dummySub2);

console.log("1st publish");
myEventEmitter.emit('test',"hello world");

console.log("release sub1");
sub1.release();

console.log("2nd publish");
myEventEmitter.emit('test',"hello once again");
