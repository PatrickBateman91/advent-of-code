const fs = require("fs");

/**
 * Part 1
 */

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data
    .split("\n")[0]
    .split(",")
    .map((s) => parseInt(s)); //?

  const numberOfDays = 80;
  const lifecycleLength = 6;

  for (let i = 0; i < numberOfDays; i++) {
    arrayOfInputs.forEach((num, index) => {
      const newNum = num - 1;

      if (num === 0) {
        arrayOfInputs.push(lifecycleLength + 2);
        arrayOfInputs[index] = lifecycleLength;
      } else {
        arrayOfInputs[index] = newNum;
      }
    });
  }

  console.log(
    `Total number of fish after ${numberOfDays} days is: ${arrayOfInputs.length}`
  );
});

/**
 * Part 2
 */

fs.readFile("./2021/Day6/input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data
    .split("\n")[0]
    .split(",")
    .map((s) => parseInt(s));

  const hashMap = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const numberOfDays = 256;

  for (const num of arrayOfInputs) {
    hashMap[num]++;
  }

  for (let i = 0; i < numberOfDays; i++) {
    const givingBirth = hashMap[0];

    for (let j = 0; j <= 8; j++) {
      if (j === 6) {
        hashMap[j] = hashMap[j + 1] + givingBirth;
      } else if (j === 8) {
        hashMap[j] = givingBirth;
      } else {
        hashMap[j] = hashMap[j + 1];
      }
    }
  }

  console.log(
    `Total number of fish after ${numberOfDays} days is: ${Object.values(
      hashMap
    ).reduce((prevVal, currVal) => prevVal + currVal)}`
  );
});
