const fs = require("fs");

/* Link to task description: https://adventofcode.com/2019/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((s) => parseInt(s));

    const sum = arrayOfInputs.reduce((acc, curr) => {
      return acc + Math.floor(curr / 3) - 2;
    }, 0);
    console.log(`Total fuel sum is: ${sum}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((s) => parseInt(s));

    function calcFormula(input) {
      let sum = 0;
      const temp = Math.floor(input / 3) - 2;
      sum += temp;
      if (temp > 0) {
        sum += calcFormula(temp);
      } else {
        return sum > 0 ? sum : 0;
      }

      return sum;
    }

    const sum = arrayOfInputs.reduce((acc, curr) => {
      return acc + calcFormula(curr);
    }, 0);

    console.log(
      `Total fuel sum for all regular masses and fuel masses is: ${sum}`
    );
  });
}

part2();
