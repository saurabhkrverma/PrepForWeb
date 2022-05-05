/*
* Sometimes when a customer is charged, there is a duplicate transaction created.
* We need to find those transactions so that they can be dealt with.
* Everything about the transaction should be identical, except the transaction id and the time at which it occurred, as there can be up to a minute delay.

*Find all transactions that have the same sourceAccount, targetAccount, category, amount,
* and the time difference between each consecutive transaction is less than 1 minute.
*/


function findDuplicateTransactions (transactions =[]){
    // base condition
    if(transactions.length < 2) {
        return transactions;
    }
    // sort the list based on the time
    transactions.sort((transactionA, transactionB)=> {
        return transactionA.time - transactionB
    });

    // create a map tp keep track to duplicates
    let transactionKeys
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
