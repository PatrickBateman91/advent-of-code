const fs = require("fs");

/* Link to task description: https://adventofcode.com/2020/day/5 */

/**
 * Part 1
 */

function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n");

    function getNumber(hash, num1, num2) {
      let divided = Math.round((num1 + num2) / 2);

      switch (hash[0]) {
        case "F":
        case "L":
          if (hash.length > 1) {
            return getNumber(hash.slice(1), num1, divided - 1);
          } else {
            return num1;
          }

        case "B":
        case "R":
          if (hash.length > 1) {
            return getNumber(hash.slice(1), divided, num2);
          } else {
            return num2;
          }
      }
    }

    const arrayOfIDs = arrayOfInputs.map((input) => {
      const row = input.slice(0, 7);
      const column = input.slice(7);

      return getNumber(row, 0, 127) * 8 + getNumber(column, 0, 7);
    });

    const biggest = arrayOfIDs.reduce((prev, curr) => {
      if (curr > prev) {
        return curr;
      } else return prev;
    }, 0);
    console.log(`Biggest ticket ID number is: ${biggest}`);
  });
}

part1();

/**
 * Part 2
 */

function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n");

    function getNumber(hash, num1, num2) {
      let divided = Math.round((num1 + num2) / 2);

      switch (hash[0]) {
        case "F":
        case "L":
          if (hash.length > 1) {
            return getNumber(hash.slice(1), num1, divided - 1);
          } else {
            return num1;
          }

        case "B":
        case "R":
          if (hash.length > 1) {
            return getNumber(hash.slice(1), divided, num2);
          } else {
            return num2;
          }
      }
    }

    const arrayOfIDs = arrayOfInputs
      .map((input) => {
        const row = input.slice(0, 7);
        const column = input.slice(7);

        return getNumber(row, 0, 127) * 8 + getNumber(column, 0, 7);
      })
      .sort((a, b) => a - b);

    let myTicketID;

    for (let i = 0; i < arrayOfIDs.length; i++) {
      if (arrayOfIDs[i - 1] && arrayOfIDs[i + 1]) {
        if (arrayOfIDs[i] + 1 !== arrayOfIDs[i + 1]) {
          myTicketID = arrayOfIDs[i] + 1;
        }
      }
    }

    console.log(`My ticket ID is: ${myTicketID}`);
  });
}

part2();
