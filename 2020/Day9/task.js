const fs = require("fs");

/**
 * Part 1
 */

function intruderCheck(num, checkArray) {
  for (let i = 0; i < checkArray.length; i++) {
    for (let j = 0; j < checkArray.length; j++) {
      if (checkArray[i] === checkArray[j]) {
        continue;
      }
      if (checkArray[i] + checkArray[j] === num) {
        return false;
      }
    }
  }

  return true;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));
  let checkArray = [];
  let intruder;

  for (let i = 25; i < arrayOfInputs.length; i++) {
    checkArray = arrayOfInputs.slice(i - 25, i);

    let check = intruderCheck(arrayOfInputs[i], checkArray);
    if (check) {
      intruder = arrayOfInputs[i];
      break;
    }
  }

  console.log(
    `Number that is not sum of any previous 25 numbers is ${intruder}`
  );
});

/**
 * Part 2
 */

function intruderCheck(num, checkArray) {
  for (let i = 0; i < checkArray.length; i++) {
    for (let j = 0; j < checkArray.length; j++) {
      if (checkArray[i] === checkArray[j]) {
        continue;
      }
      if (checkArray[i] + checkArray[j] === num) {
        return false;
      }
    }
  }

  return true;
}

function findContiguousRange(num, arrayOfInputs) {
  let range = [];
  for (let i = 0; i < arrayOfInputs.length; i++) {
    if (i === 0) {
      range.push(arrayOfInputs[i]);
    }

    for (let j = i + 1; j < arrayOfInputs.length; j++) {
      const rangeSum = range.reduce((acc, curr) => {
        return acc + curr;
      }, 0);

      const totalSum = rangeSum + arrayOfInputs[j];

      if (totalSum <= num) {
        if (totalSum < num) {
          range.push(arrayOfInputs[j]);
          continue;
        } else {
          return range;
        }
      } else {
        range = [];
        break;
      }
    }
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));
  let checkArray = [];
  let finalSum = 0;

  for (let i = 25; i < arrayOfInputs.length; i++) {
    checkArray = arrayOfInputs.slice(i - 25, i);

    let check = intruderCheck(arrayOfInputs[i], checkArray);
    if (check) {
      const range = findContiguousRange(arrayOfInputs[i], arrayOfInputs).sort(
        (a, b) => a - b
      );
      finalSum = range[0] + range[range.length - 1];
      break;
    }
  }

  console.log(
    `Sum of the smallest and largest numbers in contiguous range is ${finalSum}`
  );
});
