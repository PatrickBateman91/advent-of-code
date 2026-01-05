const fs = require("fs");

/* Link to task description: https://adventofcode.com/2022/day/5 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const moves = [];
    const crates = [];
    let temp = "";

    data.split("\n").forEach((stringInput) => {
      if (stringInput.startsWith("m")) {
        moves.push(stringInput);
      } else if (stringInput !== "") {

        stringInput.split("").forEach((crate, index) => {
          console.log(crate);
          if (crate === "") {
            console.log("Add empty space")
            crates.push([crate])
          } else {
            temp += crate;

            if (temp.length === 3) {
              crates.push[temp];
              temp = "";
            }
          }
        })
      }
    });

    console.log(crates);


  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

  });
}

part2();
