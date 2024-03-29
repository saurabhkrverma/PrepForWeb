// ref: https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82
// ref: https://www.enjoyalgorithms.com/blog/design-a-url-shortening-service-like-tiny-url

// NFRs
// 100 million requests coming in for URL shorting per month
// 100:1 read ratio = 10 billion redirection requests per month
// write req per sec = 10000000000/(30*24*60*60) = 0.003 million == 38 == 100 URLs
// write per sec = 1/sec
// URLs to store = 100 million * 12 * 10 = 12000 million == 12billion URLs

class ShortURL {

    constructor(fullUrl) {
        // this.fullUrl = fullUrl;
        // this.shortUrl;
        this.currentRange;
        this.currentCounter;
    }

    async getRange() {
        Promise.resolve([0,1000]).then((result)=>{
            this.currentRange = result;
            this.currentCounter = result[0];
            return this.currentRange
        });

    }

    _encodeNumber(number) {
        let base62set =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let chars = base62set.split("");
        let result = "";
        while(number>0) {
            const reminder = Math.floor(number%62);
            result = chars[reminder] + result;
            number = Math.floor(number/62);
        }
        return result;
    }

    encodeURL(shortUrl) {
        if(this.currentRange === undefined) return
        if(this.currentCounter >= this.currentRange[1]) // get new Range
        // encode current counter to base62 and use that as short url
        return this._encodeNumber(++this.currentCounter);
    }
}

const shortURL =  new ShortURL("http://localhost:8080")
shortURL.getRange().then(()=>{console.log(shortURL)})