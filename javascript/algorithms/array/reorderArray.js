// ref: https://bigfrontend.dev/problem/reorder-array-with-new-indexes

/*
* I/P
* const A = ['A', 'B', 'C', 'D', 'E', 'F']
* const B = [1,   5,   4,   3,   2,   0]
* O/P
* ['F', 'A', 'E', 'D', 'C', 'B']
 * */

/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
    let i = 0;
    while(i < items.length){
        if(newOrder[i] < 0){
            i++;
            continue;
        }
        // swap items
        let temp = items[i];
        items[i] = items[newOrder[i]];
        items[newOrder[i]] = temp;
        // swap indexes
        temp = newOrder[i];
        newOrder[i] = newOrder[newOrder[i]];
        newOrder[temp] = -1;
    }
    console.log(items, newOrder);
}

sort(['A', 'B', 'C', 'D', 'E', 'F'],[1,   5,   4,   3,   2,   0]);
