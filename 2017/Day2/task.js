const fs = require("fs");

/* Link to task description: https://adventofcode.com/2017/day/2 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const inputs = data.split("\n");
    let checksum = 0;

    inputs.forEach(input => {
      var digits = input.split(/[\t\n]/).map(x => parseInt(x));

      digits.sort((a,b) => a - b);
      checksum += digits[digits.length - 1] - digits[0];
    })

    console.log(`Spreadsheet checksum is : ${checksum}`);
  });
}

part1();

/**
 * Part 2
 */
 function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const inputs = data.split("\n");
    let checksum = 0;

    inputs.forEach(input => {
      var digits = input.split(/[\t\n]/).map(x => parseInt(x));
      digits.sort((a,b) => b - a);

      for(let i = 0; i < digits.length - 1; i++){
        let numFound = false;

        for(let j = i + 1; j < digits.length; j++){
          if(digits[i] % digits[j] === 0){
            checksum += (digits[i] / digits[j]);
            numFound = true;
            break;
          }
        }

        if(numFound)
          break;
      }
    })

    console.log(`Sum of each row's result is : ${checksum}`);
  });
}

  part2();
