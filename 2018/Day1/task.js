const fs = require("fs");

/* Link to task description: https://adventofcode.com/2018/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const digits = data.split("\n").map(x => parseInt(x));
    const sum = digits.reduce((acc, curr) => {
      return acc + curr;
    }, 0)

    console.log(`Final frequency is : ${sum}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const digits = data.split("\n").map(x => parseInt(x));
    let repeatedFrequence;
    let i = 0;
    const frequencyDictionary = {};
    frequencyDictionary["0"] = 0;
    let currentFrequency = 0;

    while (repeatedFrequence === undefined) {
      currentFrequency += digits[i];
      
      if(frequencyDictionary[currentFrequency.toString()] !== undefined){
        repeatedFrequence = currentFrequency;
        break;
      } else{
        frequencyDictionary[currentFrequency.toString()] = currentFrequency;
      }

      i = i === digits.length - 1 ? 0 : i + 1;
    }
    console.log(`First repeated frequency is : ${repeatedFrequence}`);
  });
}

 part2();
