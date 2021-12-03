const fs = require("fs");

/**
 * Part 1
 */
function repeatUntil(string, num) {
  if (string.length < num) {
    return repeatUntil(string + string, num);
  }

  return string;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  let move = 7;
  let treeCount = 0;

  arrayOfInputs.forEach((input, index) => {
    if (index !== 0) {
      let fullLine = repeatUntil(input, index * move);
      if (fullLine[index * move] === "#") {
        treeCount++;
      }
    }
  });

  console.log(`Tree count on the way down is: ${treeCount}`);
});

/**
 * Part 2
 */
function repeatUntil(string, num) {
  if (string.length <= num) {
    return repeatUntil(string + string, num);
  }

  return string;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const arrayOfMoves = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const treeCount = arrayOfMoves
    .map((move) => {
      let treeCount = 0;
      let linesHitCount = 1;

      arrayOfInputs.forEach((path, pathIndex) => {
        if (pathIndex !== 0 && pathIndex % move[1] === 0) {
          let fullLine = repeatUntil(path, linesHitCount * move[0]);
          if (fullLine[linesHitCount * move[0]] === "#") {
            treeCount++;
          }
          linesHitCount++;
        }
      });

      return treeCount;
    })
    .reduce((prevVal, currVal) => {
      return prevVal * currVal;
    }, 1);

  console.log(`Multiplied value of all tree counts is: ${treeCount}`);
});
