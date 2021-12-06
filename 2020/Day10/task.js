const fs = require("fs");

/**
 * Part 1
 */

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data
    .split("\n")
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);

  let prevNumber = 0;
  const counter = [0, 0, 0, 0];

  for (let i = 0; i < arrayOfInputs.length; i++) {
    let diff = arrayOfInputs[i] - prevNumber;
    prevNumber = arrayOfInputs[i];
    counter[diff]++;
  }
  // Final adapter which is +3 always
  counter[3]++;

  console.log(
    `One jolt differences multiplied by 3 jolt differences is ${
      counter[1] * counter[3]
    }`
  );
});
