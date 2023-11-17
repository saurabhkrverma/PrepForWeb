function fetchAllFeatures() {
    // in reality, this would have been a `fetch` call:
    // `fetch("/api/features/all")`
    console.log('fetchAllFeatures hit');
    return new Promise(resolve => {
        const sampleFeatures = {
            "extended-summary": true,
            "feedback-dialog": false
        };
        // return sampleFeatures;
        setTimeout(resolve, 100, sampleFeatures);
    });
}


const getFeatureState = async (featureName) => {
    return new Promise((resolve, reject)=>{
        fetchAllFeatures().then((result)=>{
            const featureState = result[featureName] || false;
            resolve(featureState);
        }).catch((err)=>{
            reject(false);
        })
    });
}

const getFeatureState2 = async (featureName) => {
    try {
        const result = await fetchAllFeatures();
        return result[featureName] || false;
    } catch (err) {
        return false;
    }
}

const getFeatureState3 = (() => {
    let cachedResult;
    return (async (featureName)=>{
        try {
            const result = cachedResult || await fetchAllFeatures();
            if(!cachedResult){
                cachedResult = result;
            }
            return result[featureName] || false;
        } catch (err) {
            return false;
        }
    });
})()


const result = getFeatureState3('extended-summary');
result.then(console.log).catch(console.log);


const result2 = getFeatureState3('feedback-dialog');
result2.then(console.log).catch(console.log);
// setTimeout(()=>{
//     const result2 = getFeatureState3('feedback-dialog');
//     result2.then(console.log).catch(console.log);
// },1000)



const foo = (() => {
    let count = 0;
    return ()=>{
        return ++count;
    }
})();


// console.log(foo())
// console.log(foo())
// console.log(foo())


