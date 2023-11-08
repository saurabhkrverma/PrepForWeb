const featureStatus = ["ENUM1", "ENUM2",  "ENUM3"];

// returns the state of *all* features for current user
function fetchAllFeatures() {
    // in reality, this would have been a `fetch` call:
    // `fetch("/api/features/all")`
    return new Promise((resolve, reject) => {
        console.log('API call')
        const sampleFeatures = {
            "extended-summary": featureStatus[Math.floor(Math.random()*3)],
            "feedback-dialog": featureStatus[Math.floor(Math.random()*3)]
        };
        setTimeout(resolve, 100, sampleFeatures);
        // setTimeout(reject, 100, "new error");
    });
}

const errorCodes = {
    'ERROR': 'genric_error',
    'NOT_CONFIGURED': 'not_configured'
}

// src/feature-x/summary.js
/**
 * @param {String: featName}
 * @returns {Promise}
 * */
let cachedFeatureStatues = {};
let currentPromise;

const successHandler = (features, featureName, resolve) => {
    cachedFeatureStatues = features;
    let currentFeatStatus = features[featureName];
    if(currentFeatStatus){
        resolve(currentFeatStatus);
    } else {
        // falling back to default feat
        currentFeatStatus = features[defaultFeat]
    }
    resolve(currentFeatStatus);
}
const errorHandler = (err, reject) => {
    reject(err);
}
const getFeatureState = (featureName, defaultFeat) => {
    return new Promise((resolve, reject)=>{
        if(Object.keys(cachedFeatureStatues).length > 0) {
            console.log('cached data returned')
            return Promise.resolve(cachedFeatureStatues[featureName])
        } else if(!currentPromise) {
            currentPromise = fetchAllFeatures()
        }
        currentPromise.then((features)=>{
            successHandler(features, featureName, resolve)
        }).catch((err)=>{
            errorHandler(err, reject)
        })
    })
}

// const test = getFeatureState("extended-summary")
// test.then((data)=>{
//     console.log('data', data);
//     getFeatureState("extended-summary").then(console.log)
// }).catch((err)=>{
//     console.log("final - reject", err);
// })
// //
// const test2 = getFeatureState("extended-summary")
// test2.then((data)=>{
//     console.log('data2', data)
// }).catch((err)=>{
//     console.log("final - reject", err);
// })


let cachedAsyncResult;
let activeAsyncCall = false;
// let's do the same thing with async await
const getFeatureState2 =  async (featName) => {
    try{
        if(!cachedAsyncResult) {
            if(!activeAsyncCall) {
                activeAsyncCall = fetchAllFeatures();
            }
            cachedAsyncResult = await activeAsyncCall;
        }
        activeAsyncCall= false;
        if(cachedAsyncResult[featName]) {
            return cachedAsyncResult[featName];
        }
        return false;
    } catch(err) {
        throw err;
    }
}


const test3 = getFeatureState2("extended-summary");
test3.then((result)=>{
    console.log('final-resolve', result)
    // test3.then((result)=>{
    //     console.log('final-resolve', result)
    // })
}).catch((err)=>{
    console.log('final-reject', err);
})

const test4 = getFeatureState2("extended-summary");
test4.then((result)=>{
    console.log('final-resolve', result)
}).catch((err)=>{
    console.log('final-reject', err);
})

