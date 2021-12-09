const fs = require("fs");

/* Link to task description: https://adventofcode.com/2020/day/2 */

/**
 * Part 1
 */

function part1() {
  function checkLetter(pass, letterToCheck) {
    let count = 0;
    for (let i = 0; i < pass.length; i++) {
      if (pass[i] === letterToCheck) {
        count++;
      }
    }
    return count;
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n");
    let numberOfValidPassword = 0;

    for (const input of arrayOfInputs) {
      const separatedInput = input.split(" ");
      const letterCount = checkLetter(separatedInput[2], separatedInput[1][0]);
      let numArray = separatedInput[0].split("-");

      if (
        letterCount >= parseInt(numArray[0]) &&
        letterCount <= parseInt(numArray[1])
      ) {
        numberOfValidPassword++;
      }
    }

    console.log(`Number of valid passwords is: `, numberOfValidPassword);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  function checkLetter(pass, letter, index1, index2) {
    let count = 0;

    if (pass[index1 - 1] === letter) {
      count++;
    }

    if (pass[index2 - 1] === letter) {
      count++;
    }

    return count === 1;
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n");
    let numberOfValidPassword = 0;

    for (const input of arrayOfInputs) {
      const separatedInput = input.split(" ");
      let numArray = separatedInput[0].split("-");
      if (
        checkLetter(
          separatedInput[2],
          separatedInput[1][0],
          numArray[0],
          numArray[1]
        )
      ) {
        numberOfValidPassword++;
      }
    }

    console.log(`Number of valid passwords is: `, numberOfValidPassword);
  });
}

part2();
