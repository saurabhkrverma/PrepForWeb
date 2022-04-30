// ref:https://blog.sessionstack.com/how-javascript-works-the-publisher-subscriber-pattern-9edc62ef1a68

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

class PubSub {
    constructor() {
        this.topics={};
    }

    publishTopic(topic,args){
        if(this.topics[topic]) {
            // call all subs
            const subs = this.topics[topic];
            subs.forEach((sub)=>{
                sub.callback(args);
            });
        } else {
            // add this topic to the list with no subs
            this.topics[topic] = [];
        }
    }
    
    subscribeTopic(topic,func) {
        if(!this.topics[topic]){
            // add this topic to the list with no sub
            this.topics[topic] = [];
        }
        const subscriber = new Subscriber(func)
        this.topics[topic].push(subscriber);
        return subscriber.id;
    }

    unsubscribeTopic(topic,subscriberId) {
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

const myPubSubBroker = new PubSub();

const sub1 = myPubSubBroker.subscribeTopic("test", dummySub);
const sub2 = myPubSubBroker.subscribeTopic("test", dummySub2);

console.log("1st publish");
myPubSubBroker.publishTopic('test',"hello world");
myPubSubBroker.unsubscribeTopic('test',sub1);
console.log("2nd publish");
myPubSubBroker.publishTopic('test',"hello world");
myPubSubBroker.unsubscribeTopic('test',sub2);
console.log("3rd publish");
myPubSubBroker.publishTopic('test',"hello world");

