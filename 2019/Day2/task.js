const fs = require("fs");

/**
 * Part 1
 */

function fixComputer(arrayOfInputs) {
  for (let i = 0; i < arrayOfInputs.length; i += 4) {
    if (arrayOfInputs[i] === 1) {
      arrayOfInputs[arrayOfInputs[i + 3]] =
        arrayOfInputs[arrayOfInputs[i + 1]] +
        arrayOfInputs[arrayOfInputs[i + 2]];
    } else if (arrayOfInputs[i] === 2) {
      arrayOfInputs[arrayOfInputs[i + 3]] =
        arrayOfInputs[arrayOfInputs[i + 1]] *
        arrayOfInputs[arrayOfInputs[i + 2]];
    } else if (arrayOfInputs[i] === 99) {
      break;
    }
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split(",").map((s) => parseInt(s));
  arrayOfInputs[1] = 12;
  arrayOfInputs[2] = 2;
  fixComputer(arrayOfInputs);

  console.log(`Value of position 0 in array of inputs is: ${arrayOfInputs[0]}`);
});

/**
 * Part 2
 */

function compute(arrayOfInputs, noun, verb) {
  arrayOfInputs[1] = noun;
  arrayOfInputs[2] = verb;

  for (let i = 0; i < arrayOfInputs.length; i += 4) {
    if (arrayOfInputs[i] === 1) {
      arrayOfInputs[arrayOfInputs[i + 3]] =
        arrayOfInputs[arrayOfInputs[i + 1]] +
        arrayOfInputs[arrayOfInputs[i + 2]];
    } else if (arrayOfInputs[i] === 2) {
      arrayOfInputs[arrayOfInputs[i + 3]] =
        arrayOfInputs[arrayOfInputs[i + 1]] *
        arrayOfInputs[arrayOfInputs[i + 2]];
    } else if (arrayOfInputs[i] === 99) {
      break;
    }
  }

  return arrayOfInputs[0];
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split(",").map((s) => parseInt(s));
  let targetAnswer = 19690720;
  let finalResult = 0;

  for (let i = 0; i < 100; i++) {
    let answerFound = false;

    for (let j = 0; j < 100; j++) {
      let copyInputs = arrayOfInputs.map((i) => i);
      let answer = compute(copyInputs, i, j);

      if (answer === targetAnswer) {
        targetAnswer = true;
        finalResult = 100 * i + j;
        break;
      }
    }

    if (answerFound) {
      break;
    }
  }

  console.log(
    `Verb and noun that produce ${targetAnswer} multiplied by 100 equal to ${finalResult}`
  );
});
