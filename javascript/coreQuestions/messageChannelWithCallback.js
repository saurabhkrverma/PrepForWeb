// ref: https://bigfrontend.dev/problem/some-message-channel



// interface SomePort {
//   postMessage: (message: string) => void
//   onmessage?: (message: string) => void
// }

// declare class SomeChannel {
//   port1: SomePort
//   port2: SomePort
// }

/// check this for arrow function vs normal function

// class SomeChannel {
//     constructor() {
//         const port1 = {
//             postMessage(message) {
//                 const delay = Math.random() * 1000;
//                 setTimeout(() => {
//                     if (port2.onmessage) {
//                         port2.onmessage(message)
//                     }
//                 }, delay)
//             }
//         }
//         const port2 = {
//             postMessage(message) {
//                 console.log(message);
//                 const delay = Math.random() * 1000;
//                 setTimeout(() => {
//                     if (port1.onmessage) {
//                         port1.onmessage(message)
//                     }
//                 }, delay)
//             }
//         }
//         this.port1 = port1;
//         this.port2 = port2;
//     }
// }

class SomeChannel {
    constructor() {
        this.port1 = {
            postMessage: (message) => {
                const delay = Math.random() * 1000;
                setTimeout(() => {
                    if (this.port2.onmessage) {
                        this.port2.onmessage(message)
                    }
                }, delay)
            }
        };
        this.port2 = {
            postMessage: (message) => {
                const delay = Math.random() * 1000;
                setTimeout(() => {
                    if (this.port1.onmessage) {
                        this.port1.onmessage(message)
                    }
                }, delay)
            }
        };
    }
}

class BetterChannel {
    constructor() {
        const { port1, port2 } = new SomeChannel();
        let callbacks = [];
        let id = -1;

        port1.onmessage = (decoratedMessage)=>{
            const {id,message} = JSON.parse(decoratedMessage);
            const callback = callbacks[id];
            let executed = false;
            if(this.port2.onmessage && !executed){
                this.port2.onmessage(message,(reply)=>{
                    !executed && callback(reply);
                    executed = true;
                });
            }
        }

        port2.onmessage = (decoratedMessage)=>{
            const {id,message} = JSON.parse(decoratedMessage);
            const callback = callbacks[id];
            let executed = false;
            if(this.port1.onmessage){
                this.port1.onmessage(message,(reply)=>{
                    !executed && callback(reply);
                    executed = true;
                });
            }
        }

        this.port1 = {
            postMessage: (message, callback) => {
                id++;
                callbacks[id] = callback;
                port2.postMessage(JSON.stringify({id,message}));
            }
        }

        this.port2 = {
            postMessage: (message, callback) => {
                id++;
                callbacks[id] = callback;
                port1.postMessage(JSON.stringify({id,message}));
            }
        }
    }
}
//
const { port1, port2 } = new BetterChannel()
console.log(port1, port2 );
// port2.onmessage = (message, reply) => {
//     if (message === 'ping?') {
//         reply('pong!')
//         reply('pong!')
//     }
//     if (message === 'pong?') {
//         reply('ping!')
//     }
// }
//
// port1.postMessage('ping?', (data) => {
//     console.log(data) // 'pong!'
// })


class MyPort {
    #callback;
    constructor(name) {
        this.name = name;
        this.#callback;
    }

    onMessage = (message)=>{
        console.log(`this is ${this.name}`, message)
        if (message === 'ping?') {
            this.postMessage('pong!')
        }
        if (message === 'pong?') {
            this.postMessage('ping!')
        }
    }

    postMessage = (message) => {
        this.#callback(message);
    }

    postMessageRegister = (callback) => {
        this.#callback = callback;
    }
}


class MyChannel {
    constructor() {
        this.port1 = new MyPort('port1');
        this.port2 = new MyPort('port2');

        this.port1.postMessageRegister(this.port2.onMessage)
        this.port2.postMessageRegister(this.port1.onMessage)
    }
}

// const {port1, port2} = new MyChannel();
//
// port1.postMessage('ping?');


