const fs = require("fs");

/**
 * Part 1
 */

function runCommand(currentPoint, direction, num) {
  switch (direction) {
    case "U":
      currentPoint[0] += num;
      break;

    case "D":
      currentPoint[0] -= num;
      break;
    case "R":
      currentPoint[1] += num;
      break;

    case "L":
      currentPoint[1] -= num;
      break;

    default:
      break;
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((l) => l.split(","));

  let wirePoints = {};

  arrayOfInputs.forEach((line, lineIndex) => {
    let currentPoint = [0, 0];

    line.forEach((action, actionIndex) => {
      let direction = action[0];
      let num = parseInt(action.slice(1));

      for (let i = 1; i <= num; i++) {
        runCommand(currentPoint, direction, 1);
        if (lineIndex === 0) {
          if (
            !wirePoints.hasOwnProperty(`${currentPoint[0]},${currentPoint[1]}`)
          ) {
            wirePoints[`${currentPoint[0]},${currentPoint[1]}`] = 1;
          }
        } else {
          if (
            wirePoints.hasOwnProperty(`${currentPoint[0]},${currentPoint[1]}`)
          ) {
            wirePoints[`${currentPoint[0]},${currentPoint[1]}`] = 2;
          }
        }
      }
    });
  });

  const crossingPoints = Object.keys(wirePoints).filter((key) => {
    return wirePoints[key] === 2;
  });

  let smallest;

  crossingPoints.forEach((point) => {
    let [num1, num2] = point.split(",");
    let sum = Math.abs(parseInt(num1)) + Math.abs(parseInt(num2));

    if (smallest === undefined || sum < smallest) {
      smallest = sum;
    }
  });

  console.log(
    `Manhattan distance between central point and nearest crossing point is ${smallest}`
  );
});

/**
 * Part 2
 */

function runCommand(currentPoint, direction, num) {
  switch (direction) {
    case "U":
      currentPoint[0] += num;
      break;

    case "D":
      currentPoint[0] -= num;
      break;
    case "R":
      currentPoint[1] += num;
      break;

    case "L":
      currentPoint[1] -= num;
      break;

    default:
      break;
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n").map((l) => l.split(","));

  let wirePoints = {};
  const crossingPoints = [];

  arrayOfInputs.forEach((line, lineIndex) => {
    let currentPoint = [0, 0];
    let stepCount = 0;

    line.forEach((action) => {
      let direction = action[0];
      let num = parseInt(action.slice(1));

      for (let i = 1; i <= num; i++) {
        stepCount++;
        runCommand(currentPoint, direction, 1);

        if (lineIndex === 0) {
          if (
            !wirePoints.hasOwnProperty(`${currentPoint[0]},${currentPoint[1]}`)
          ) {
            wirePoints[`${currentPoint[0]},${currentPoint[1]}`] = stepCount;
          }
        } else {
          if (
            wirePoints.hasOwnProperty(`${currentPoint[0]},${currentPoint[1]}`)
          ) {
            crossingPoints.push(`${currentPoint[0]},${currentPoint[1]}`);
            wirePoints[`${currentPoint[0]},${currentPoint[1]}`] += stepCount;
          }
        }
      }
    });
  });

  let smallest;

  crossingPoints.forEach((point) => {
    if (smallest === undefined || wirePoints[point] < smallest) {
      smallest = wirePoints[point];
    }
  });

  console.log(
    `Manhattan distance between central point and nearest crossing point is ${smallest}`
  );
});
