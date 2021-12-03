const fs = require("fs");

/**
 * Part 1
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));
  let prevNum = 0;
  let incCount = 0;
  for (let i = 0; i < arrayOfInputs.length; i++) {
    if (i === 0) {
      continue;
    }

    if (arrayOfInputs[i] > prevNum) {
      incCount++;
    }
    prevNum = arrayOfInputs[i];
  }
  console.log("Total number of increments is: ", incCount);
});

/**
 * Part 2
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((s) => parseInt(s));
  let prevCount;
  let incCount = 0;

  for (let i = 0; i < arrayOfInputs.length; i++) {
    if (arrayOfInputs[i - 1] && arrayOfInputs[i + 1]) {
      let currentCount =
        arrayOfInputs[i] + arrayOfInputs[i - 1] + arrayOfInputs[i + 1];

      if (currentCount > prevCount) {
        if (prevCount) {
          incCount++;
        }
      }

      prevCount = currentCount;
    }
  }
  console.log("Total number of grouped increments is: ", incCount);
});
