const fs = require("fs");

/* Link to task description: https://adventofcode.com/2017/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const digits = data.split("").map(x => parseInt(x));
    let sum = 0;

    for(let i = 0; i < digits.length; i++){
      let num1 = digits[i];
      let num2 = i === digits.length - 1 ? digits[0] : digits[i + 1];
    
      if(num1 === num2){
        sum +=  num1
      }
    }

    console.log(`Total sum of digits is : ${sum}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const digits = data.split("").map(x => parseInt(x));
    let sum = 0;
    const half = digits.length / 2;
    for(let i = 0; i < digits.length; i++){
      let num1 = digits[i];
      let num2;

      if(i + half > digits.length - 1){
        num2 = digits[(i + half) - (digits.length)];
      } else{
        num2 = digits[i + half];
      }
      if(num1 === num2){
        sum +=  num1
      }
    }

    console.log(`Total sum of digits halfway around is : ${sum}`);
  });
}

 part2();
