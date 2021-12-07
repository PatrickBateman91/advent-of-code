const fs = require("fs");

/**
 * Part 1
 */

// function getDirectionIndex(direction, sides) {
//   for (let i = 0; i < sides.length; i++) {
//     if (sides[i] === direction) {
//       return i;
//     }
//   }
// }

// function getNewDirection(direction, side, num) {
//   const sides = ["N", "E", "S", "W"];
//   const currentDirectionIndex = getDirectionIndex(direction, sides);

//   if (side === "L") {
//     if (currentDirectionIndex - num / 90 < 0) {
//       let diff = sides.length - Math.abs(currentDirectionIndex - num / 90);
//       return sides[diff];
//     } else {
//       return sides[currentDirectionIndex - num / 90];
//     }
//   } else {
//     if (currentDirectionIndex + num / 90 >= sides.length) {
//       let diff = Math.abs(sides.length - (currentDirectionIndex + num / 90));
//       return sides[diff];
//     } else {
//       return sides[currentDirectionIndex + num / 90];
//     }
//   }
// }

// fs.readFile("input.txt", "utf-8", function (err, data) {
//   if (err) throw err;
//   const arrayOfInputs = data.split("\n");

//   const counter = {
//     E: 0,
//     W: 0,
//     N: 0,
//     S: 0,
//   };

//   let currentDirection = "E";

//   arrayOfInputs.forEach((command) => {
//     let action = command[0];
//     let num = parseInt(command.slice(1));

//     switch (action) {
//       case "N":
//       case "S":
//       case "E":
//       case "W":
//         counter[action] += num;
//         break;

//       case "L":
//       case "R":
//         const newDirection = getNewDirection(currentDirection, action, num);
//         currentDirection = newDirection;
//         break;

//       case "F":
//         counter[currentDirection] += num;
//         break;
//     }
//   });

//   const manhattanDistance =
//     Math.abs(counter.E - counter.W) + Math.abs(counter.N - counter.S);
//   console.log(
//     `Manhattan distance between first location and second is ${manhattanDistance}`
//   );
// });

/**
 * Part 2
 */

function getDirectionIndex(direction, sides) {
  for (let i = 0; i < sides.length; i++) {
    if (sides[i] === direction) {
      return i;
    }
  }
}

function getNewDirection(direction, side, num) {
  const sides = ["N", "E", "S", "W"];
  const currentDirectionIndex = getDirectionIndex(direction, sides);

  if (side === "L") {
    if (currentDirectionIndex - num / 90 < 0) {
      let diff = sides.length - Math.abs(currentDirectionIndex - num / 90);
      return sides[diff];
    } else {
      return sides[currentDirectionIndex - num / 90];
    }
  } else {
    if (currentDirectionIndex + num / 90 >= sides.length) {
      let diff = Math.abs(sides.length - (currentDirectionIndex + num / 90));
      return sides[diff];
    } else {
      return sides[currentDirectionIndex + num / 90];
    }
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");

  const position = {
    E: 0,
    W: 0,
    N: 0,
    S: 0,
  };

  const waypoint = {
    E: 10,
    W: 0,
    N: 1,
    S: 0,
  }

  let currentDirection = "E";
  let currentWayPoint = ["E", "N"]


  arrayOfInputs.forEach((command) => {
    let action = command[0];
    let num = parseInt(command.slice(1));

    switch (action) {
      case "N":
      case "S":
      case "E":
      case "W":
        counter[action] += num;
        break;

      case "L":
      case "R":
        const newDirection = getNewDirection(currentDirection, action, num);
        currentDirection = newDirection;
        break;

      case "F":
        counter[currentDirection] += num;
        break;
    }
  });

//   const manhattanDistance =
//     Math.abs(counter.E - counter.W) + Math.abs(counter.N - counter.S);
//   console.log(
//     `Manhattan distance between first location and second is ${manhattanDistance}`
//   );
});
