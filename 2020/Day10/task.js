const fs = require("fs");

/**
 * Part 1
 */

// fs.readFile("input.txt", "utf-8", function (err, data) {
//   if (err) throw err;
//   const arrayOfInputs = data
//     .split("\n")
//     .map((s) => parseInt(s))
//     .sort((a, b) => a - b);

//   let prevNumber = 0;
//   const counter = [0, 0, 0, 0];

//   for (let i = 0; i < arrayOfInputs.length; i++) {
//     let diff = arrayOfInputs[i] - prevNumber;
//     prevNumber = arrayOfInputs[i];
//     counter[diff]++;
//   }
//   // Final adapter which is +3 always
//   counter[3]++;

//   console.log(
//     `One jolt differences multiplied by 3 jolt differences is ${
//       counter[1] * counter[3]
//     }`
//   );
// });

/**
 * Part 2
 */

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data
    .split("\n")
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);

  const counter = [];
  arrayOfInputs.unshift(0);
  arrayOfInputs.push(arrayOfInputs[arrayOfInputs.length - 1] + 3);
  console.log(arrayOfInputs.length);
  for (let i = 0; i < arrayOfInputs.length; i++) {
    let numberOfIPermutations = 0;

    if (i > 100) {
      console.log("i", i);
    }

    if (i === 0) {
      counter.push(1);
      continue;
    }

    for (let j = i; j < arrayOfInputs.length; j++) {
      if (arrayOfInputs[i - 1] + 3 >= arrayOfInputs[j]) {
        numberOfIPermutations++;
      } else {
        break;
      }
    }

    counter.push(numberOfIPermutations);
  }

  let finalCount = 1;

  for (let i = 0; i < counter.length; i++) {
    let factorial = 1;

    for (let j = 1; j <= counter[i]; j++) {
      factorial *= j;
    }

    finalCount *= factorial;
  }

  console.log(finalCount);
});
