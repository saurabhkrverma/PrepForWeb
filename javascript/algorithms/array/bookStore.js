// https://exercism.org/tracks/javascript/exercises/book-store

// One copy of any of the five books costs $8.
// If, however, you buy two different books, you get a 5% discount on those two books.
// If you buy 3 different books, you get a 10% discount.
// If you buy 4 different books, you get a 20% discount.
// If you buy all 5, you get a 25% discount.

// [1,1,2,2,3,3,4,5]
// group1 = [1,2,3,4,5], [1,2,3] => total cost 30 + 21.6 = 51.6
// group1 = [1,2,3,4], [1,2,3,5] => total cost 25.1 + 25.1 = 51.2 => selected discount to be applied


// [1,1,2,2,3,4,5]
// [1,2,3,4,5], [1,2] => 30 + 15.2 = 45.2
// [1,2,3,5], [1,2,4] => 15.1 + 21.6 = 36.7
const createGroup = (books) => {

}

const getTotal = (numOfBooks) => {
    const discountMap = {
        2: 5,
        3: 10,
        4: 20,
        5: 25
    }

    let total = numOfBooks * 8;
    if(discountMap[numOfBooks]) {
        const discount = Number(discountMap[numOfBooks]);
        total = (total - (total * (discount/100)));
    }
    return total;
}

/**
 * @param {Array: any[]} books
 * @returns {Number}
 * */
const calculateCostGreedy = (books, total = 0) => {
    if(!books || books.length <= 0) {
        return total
    }
    const bookSet = {};
    let totalBooks = 0;
    // create the book set
    books.forEach((book)=>{
        if(!bookSet[book]) {
            bookSet[book] = true;
        }
    })

    // remove the books added to the pricing cart
    Object.keys(bookSet).forEach((key)=>{
        totalBooks++;
        books.splice(books.indexOf(Number(key)),1);
    });

    const totalPrice = getTotal(totalBooks);
    return calculateCost(books,totalPrice+total)
}

console.log(calculateCostGreedy([1,1,2,2,3,3,4,5]))

// let's create an optimal solution now

// ToDo:
