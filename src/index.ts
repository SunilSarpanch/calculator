function add(numbers: string): number {
  if (numbers === "") {
    return 0;
  }

  let delimiters = ",";
    if (numbers.indexOf("//") === 0) {
        delimiters = "";
        const delimitersEndIndex = numbers.indexOf('\n');
        const delimitersStr = numbers.slice(2, delimitersEndIndex).trim();
        
        numbers = numbers.slice(delimitersEndIndex + 1);

        if(delimitersStr.indexOf('[') !== -1){
            delimiters = delimitersStr.replace(/[[]/g, '').replace(/]/g, '|').trim();
        } else {
            delimiters = delimitersStr;
        }
    }

  let sum = 0;
  let negativeNos = "";

  let regex = new RegExp(`[\n${delimiters}]`);

  const numArray = numbers.split(regex);

  for (let num of numArray) {
    if (num.trim() !== "") {
      const no = parseInt(num.trim(), 10);
      if (no < 0) {
        negativeNos = negativeNos ? `${negativeNos}, ${no}` : `${no}`;
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
console.log("sum case 5 : ", add("1\n2,3"));
console.log("sum case 6 : ", add("1\n2\n,\n3"));
console.log("sum case 7 : ", add("//;\n1;2")); // handle delimiter ;
console.log("sum case 8 : ", add("\n1,4"));
console.log("sum case 9 : ", add("//&&\n1&&4")); // handle delimiter &&
console.log("sum case 10 : ", add("//&#&\n1&#&5")); // handle delimiter &#&
console.log("sum case 11 : ", add("//[***]\n1***2***3"));
console.log("sum case 12 : ", add("//[*][%]\n1*2%4"));
// throw error and handle using try catch
try {
  add("//;\n-1;2");
} catch (err: any) {
  console.log("sum error case 1 : ", err.message);
}

try {
  add("-1, -5, 4");
} catch (err: any) {
  console.log("sum error case 1 : ", err.message);
}
