const fs = require("fs");

/* Link to task description: https://adventofcode.com/2019/day/5 */

/**
 * Part 1
 */
function part1() {
  function compute(arrayOfInputs, inputValue, outputs = []) {
    for (let i = 0; i < arrayOfInputs.length; ) {
      let breaker = false;
      let instruction = arrayOfInputs[i].toString().split("");

      let opcode = instruction[instruction.length - 2]
        ? instruction[instruction.length - 2]
        : 0 + instruction[instruction.length - 1];

      switch (opcode) {
        case "01":
        case "02":
          let num1 =
            instruction[instruction.length - 3] === "1"
              ? arrayOfInputs[i + 1]
              : arrayOfInputs[arrayOfInputs[i + 1]];

          let num2 =
            instruction[instruction.length - 4] === "1"
              ? arrayOfInputs[i + 2]
              : arrayOfInputs[arrayOfInputs[i + 2]];

          if (opcode === "01") {
            arrayOfInputs[arrayOfInputs[i + 3]] = num1 + num2;
          } else {
            arrayOfInputs[arrayOfInputs[i + 3]] = num1 * num2;
          }
          i += 4;
          break;

        case "03":
          let num = arrayOfInputs[i + 1];
          arrayOfInputs[arrayOfInputs[i + 1]] = inputValue;
          i += 2;
          break;

        case "04":
          i++;
          outputs.push(arrayOfInputs[i]);
          break;

        case "99":
          breaker = true;
          break;

        default:
          breaker = true;
          break;
      }

      if (breaker) {
        break;
      }
    }

    return arrayOfInputs[0];
  }

  fs.readFile("./2019/Day5/input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split(",").map((l) => parseInt(l));
    const output = compute(arrayOfInputs, 1); //?
    console.log(output);
  });
}

part1();
