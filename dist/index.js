"use strict";
function add(numbers) {
    if (numbers === "") {
        return 0;
    }
    let sum = 0;
    let negativeNos = "";
    const numArray = numbers.split(/[\n,]/);
    for (let num of numArray) {
        if (num.trim() !== "") {
            const no = parseInt(num.trim(), 10);
            if (no < 0) {
                negativeNos = negativeNos ? `{${negativeNos}, ${no}}` : `${no}`;
            }
            if (negativeNos) {
                continue;
            }
            sum += no;
        }
    }
    if (negativeNos) {
        throw new Error(`negative numbers not allowed ${negativeNos}`);
    }
    return sum;
}
console.log("sum case 1 : ", add(""));
console.log("sum case 2 : ", add("1"));
console.log("sum case 3 : ", add("1,5"));
console.log("sum case 4 : ", add("1,4,6,4"));
console.log("sum is : ", add("1\n2,3"));
console.log("sum is : ", add("-1;4"));
