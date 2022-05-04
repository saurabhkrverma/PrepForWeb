// categorise the similar transactions

/*
* Amount the bunch of transactions given, there are some without the category,
* you need to enhance them by giving them a category if there are other transactions
* with same target account and difference between the two accounts is not more than 1000
* In case, there are multiple such transactions with different categories, select the one with
* minimum amount difference
* */

const findClosestAmount = (transaction, possibleCandidates) => {
    let currentCandidate;
    for(let i=0; i<possibleCandidates.length; i++){
        // this can be done with the binary
        const amountDiff = Math.abs(transaction.amount - possibleCandidates[i].amount);
        if(amountDiff > 1000){
            continue;
        }
        // check diff
        if(currentCandidate) {
            const lastAmountDiff = Math.abs(transaction.amount - currentCandidate.amount);
            if(lastAmountDiff > amountDiff){
                currentCandidate = possibleCandidates[i];
            }
        } else {
            currentCandidate = possibleCandidates[i];
        }
    }
    return currentCandidate
}

const categorizeSimilarTransactions = (transactions) => {

    const groupByTarget = {};

    // creating a map with target account as key
    transactions.forEach((transaction)=>{
        const isCategorized = !!(transaction.category);
        if(isCategorized){
            groupByTarget[transaction.targetAccount] = groupByTarget[transaction.targetAccount] || [];
            groupByTarget[transaction.targetAccount].push(transaction);
        }
    });

    // sorting the groupByTarget by amount in asc order , it would help us in finding the closet amount later
    Object.keys(groupByTarget).forEach((group)=>{
        groupByTarget[group].sort((transactionA,transactionB)=>{
            return (transactionA.amount - transactionB.amount);
        })
    });

    transactions.forEach((transaction)=>{
        const isCategorized = !!(transaction.category);
        // looking for only uncategorized transactions
        if(!isCategorized){
            // check for the same target account
            if(groupByTarget[transaction.targetAccount]){
                const possibleCandidates = groupByTarget[transaction.targetAccount];
                const currentCandidate = findClosestAmount(transaction,possibleCandidates);
                if(currentCandidate) {
                    transaction.category = currentCandidate.category;
                }
            }
        }
    });

    return transactions
};


const foo = categorizeSimilarTransactions([
    {
        id: "a001bb66-6f4c-48bf-8ae0-f73453aa8dd5",
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 350,
        time: "2021-04-10T10:30:00Z",
    },
    {
        id: "bfd6a11a-2099-4b69-a7bb-572d8436cf73",
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 500,
        category: "eating_out",
        time: "2021-03-12T12:34:00Z",
    },
    {
        id: "bfd6a11a-2099-4b69-a7bb-572d8436cf73",
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 350,
        category: "eating_out_out",
        time: "2021-03-12T12:34:00Z",
    },
    {
        id: "6359091e-1187-471f-a2aa-81bd2647210f",
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 200,
        category: "entertainment",
        time: "2021-01-12T08:23:00Z",
    },
    {
        id: "a8170ced-1c5f-432c-bb7d-867589a9d4b8",
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -1690,
        time: "2021-04-12T08:20:00Z",
    },
]);

// console.log(foo);

