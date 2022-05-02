// ref: https://github.com/rvisas/CodeChallenge-Klarna-JS

/*
Calculate the amount spent in a specific category within the specified time period
getAmountByCategoryInPeriod(transactionsList, category, startTime, endTime)
 */


/*
{
  id: 123,
  sourceAccount: 'my_account',
  targetAccount: 'coffee_shop',
  amount: -30,
  category: 'eating_out',
  time: '2018-03-12T12:34:00Z'
}
*/

function getAmountByCategoryInPeriod(transactionsList, category, startTime, endTime){
    const total = transactionsList.reduce((amount, transaction)=>{
        // check for category
        const isInCategory = (transaction.category === category);
        //check for time period
        const transactionTime = new Date(transaction.time)
        const withinPeriod = (transactionTime >= startTime && transactionTime < endTime);
        if(isInCategory && withinPeriod){
            amount+=transaction.amount;
        }
        return amount;
    },0)
    return total;
}

function getBalanceByCategoryInPeriod(transactions = [], category, start, end){
    return (transactions.length === 0) ? 0 : transactions.reduce((balance, transaction) => {
        return ((transaction.category === category)
            && (new Date(transaction.time) >= start)
            && (new Date(transaction.time) < end)) ? balance + transaction.amount : balance;
    }, 0);
}

const sampleTransactions = [
    {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -100,
        category: 'groceries',
        time: '2019-07-01T00:00:01Z'
    },
    {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'restaurant',
        amount: -50,
        category: 'eating_out',
        time: '2019-07-03T10:27:00Z'
    },
    {
        id: 3,
        sourceAccount: 'klarna',
        targetAccount: 'my_account',
        amount: 25000,
        category: 'salary',
        time: '2019-07-01T10:27:00Z'
    },
    {
        id: 4,
        sourceAccount: 'mini_market',
        targetAccount: 'my_account',
        amount: 200,
        category: 'groceries',
        time: '2019-07-31T10:27:00Z'
    },
    {
        id: 5,
        sourceAccount: 'my_account',
        targetAccount: 'mini_market',
        amount: 75,
        category: 'groceries',
        time: '2019-06-30T10:27:00Z'
    }
];


console.log("total balance for category groceries", getAmountByCategoryInPeriod(sampleTransactions,"groceries",new Date("2019-07-01T00:00:00Z"),new Date("2019-07-31T23:59:59Z")))

