const fs = require("fs");

/* Link to task description: https://adventofcode.com/2019/day/5 */

/**
 * Part 1
 */
function part1() {
  function compute(arrayOfInputs, noun, verb) {
    arrayOfInputs[1] = noun;
    arrayOfInputs[2] = verb;
    let inc = 4;

    for (let i = 0; i < arrayOfInputs.length; i += inc) {
      let breaker = false;

      switch (arrayOfInputs[i]) {
        case 1:
          arrayOfInputs[arrayOfInputs[i + 3]] =
            arrayOfInputs[arrayOfInputs[i + 1]] +
            arrayOfInputs[arrayOfInputs[i + 2]];
          break;

        case 2:
          arrayOfInputs[arrayOfInputs[i + 3]] =
            arrayOfInputs[arrayOfInputs[i + 1]] *
            arrayOfInputs[arrayOfInputs[i + 2]];
          break;

        case 3:
          arrayOfInputs[arrayOfInputs[i + 1]] = arrayOfInputs[i]; //?
          break;
        case 4:
          break;

        case 99:
          breaker = true;
          break;
      }

      if (breaker) {
        break;
      }
    }

    return arrayOfInputs[0];
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split(",").map((l) => l.split(","));
  });
}

part1();
