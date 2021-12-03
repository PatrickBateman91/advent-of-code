const fs = require("fs");

/**
 * Part 1
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));

  let target = 2020;
  let outerIndex = 0;

  for (const outerNum of arrayOfInputs) {
    let innerIndex = 0;
    let found = false;
    for (const innerNum of arrayOfInputs) {
      if (outerIndex === innerIndex) {
        innerIndex++;
        continue;
      }

      if (outerNum + innerNum === target) {
        // console.log(
        //   `Two numbers that add up to ${target} are ${outerNum} and ${innerNum}`
        // );
        // console.log(`Their multiplied value is ${outerNum * innerNum}`);
        found = true;
        break;
      }
      innerIndex++;
    }

    if (found) {
      break;
    }
    outerIndex++;
  }
});

/**
 * Part 2
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));

  let target = 2020;
  let firstIndex = 0;

  for (const firstNum of arrayOfInputs) {
    let secondIndex = 0;
    let found = false;
    for (const secondNum of arrayOfInputs) {
      let thirdIndex = 0;

      for (const thirdNum of arrayOfInputs) {
        if (
          firstIndex === secondIndex ||
          firstIndex === thirdIndex ||
          secondIndex === thirdIndex
        ) {
          thirdIndex++;
          continue;
        }

        if (firstNum + secondNum + thirdNum === target) {
          console.log(
            `three numbers that add up to ${target} are ${firstNum}, ${secondNum} and ${thirdNum}`
          );
          console.log(
            `Their multiplied value is ${firstNum * secondNum * thirdNum}`
          );
          found = true;
          break;
        }

        thirdIndex++;
      }

      if (found) {
        break;
      }
      secondIndex++;
    }

    if (found) {
      break;
    }
    firstIndex++;
  }
});
