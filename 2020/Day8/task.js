const fs = require("fs");

/* Link to task description: https://adventofcode.com/2020/day/8 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((i) => i.split(" "));

    let accumulator = 0;
    let repeatingCommandIndex = [];

    for (let i = 0; i < arrayOfInputs.length; i++) {
      if (repeatingCommandIndex.includes(i)) {
        break;
      }

      const command = arrayOfInputs[i][0].trim();
      const num = parseInt(arrayOfInputs[i][1].trim());

      switch (command) {
        case "acc":
          accumulator += num;
          break;

        case "jmp":
          i += num - 1;
          break;

        default:
          repeatingCommandIndex.push(i);
          continue;
      }

      repeatingCommandIndex.push(i);
    }

    console.log(
      `The value of accumulator just before infinite loop is: ${accumulator}`
    );
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  function checkLoop(arrayOfInputs) {
    let accumulator = 0;
    let repeatingCommandIndex = [];

    for (let i = 0; i < arrayOfInputs.length; i++) {
      if (repeatingCommandIndex.includes(i)) {
        return false;
      }

      const command = arrayOfInputs[i][0].trim();
      const num = parseInt(arrayOfInputs[i][1].trim());

      switch (command) {
        case "acc":
          accumulator += num;
          break;

        case "jmp":
          i += num - 1;
          break;

        default:
          repeatingCommandIndex.push(i);
          continue;
      }

      repeatingCommandIndex.push(i);

      if (i === arrayOfInputs.length - 1) {
        return accumulator;
      }
    }
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((i) => i.split(" "));

    let accumulator = 0;
    let repeatingCommandIndex = [];
    let correctFound = false;

    for (let i = 0; i < arrayOfInputs.length; i++) {
      if (repeatingCommandIndex.includes(i)) {
        return false;
      }

      const command = arrayOfInputs[i][0].trim();
      const num = parseInt(arrayOfInputs[i][1].trim());

      switch (command) {
        case "acc":
          accumulator += num;
          break;

        case "jmp":
          const copyInput1 = JSON.parse(JSON.stringify(arrayOfInputs));
          copyInput1[i][0] = "nop";
          const check1 = checkLoop(copyInput1);
          if (check1 || check1 === 0) {
            accumulator = check1;
            correctFound = true;
          } else {
            i += num - 1;
            break;
          }
          break;

        case "nop":
          const copyInput2 = JSON.parse(JSON.stringify(arrayOfInputs));
          copyInput2[i][0] = "jmp";
          const check2 = checkLoop(copyInput2);

          if (check2 || check2 === 0) {
            accumulator = check2;
            correctFound = true;
          } else {
            repeatingCommandIndex.push(i);
            continue;
          }

        default:
          repeatingCommandIndex.push(i);
          continue;
      }

      repeatingCommandIndex.push(i);

      if (correctFound) {
        break;
      }

      if (i === arrayOfInputs.length - 1) {
        return true;
      }
    }

    console.log(
      `The value of accumulator just before infinite loop is: ${accumulator}`
    );
  });
}

part2();
