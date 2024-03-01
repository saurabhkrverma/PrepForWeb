// ref: https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447
// ref: https://medium.com/@sureshpodeti/system-design-google-docs-93e12133a979

// Tii(Ins[p1, c1], Ins[p2, c2]) {
//     if (p1 < p2) || ((p1 == p2) && (order() == -1))  // order() – order calculation
//     return Ins[p1, c1]; // Tii(Ins[3, ‘a’], Ins[4, ‘b’]) = Ins[3, ‘a’]
// else
//     return Ins[p1 + 1, c1]; // Tii(Ins[3, ‘a’], Ins[1, ‘b’]) = Ins[4, ‘a’]
// }
//
// Tid(Ins[p1, c1], Del[p2]) {
//     if (p1 <= p2)
//         return Ins[p1, c1]; // Tid(Ins[3, ‘a’], Del[4]) = Ins[3, ‘a’]
//     else
//         return Ins[p1 – 1, c1]; // Tid(Ins[3, ‘a’], Del[1]) = Ins[2, ‘a’]
// }
//
// Tdi(Del[p1], Ins[p2, c1]) {
//     // Exercise
// }
//
// Tdd(Del[p1], Del[p2]) {
//     if (p1 < p2)
//         return Del[p1]; // Tdd(Del[3], Del[4]) = Del[3]
//     else
//     if (p1 > p2) return Del[p1 – 1]; // Tdd(Del[3], Del[1]) = Del[2]
// else
//     return Id; // Id – identity operator
// }