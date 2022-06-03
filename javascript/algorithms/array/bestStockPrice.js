// ref: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = Math.min();
    let maxProfit = 0;
    for(let i=0; i<prices.length; i++){
        const currPrice = prices[i]
        if(currPrice < minPrice) {
            minPrice = currPrice
        } else {
            const currProfit = currPrice - minPrice;
            if(currProfit>maxProfit){
                maxProfit = currProfit
            }
        }
    }
    return maxProfit;

};
