const fs = require("fs");

/* Link to task description: https://adventofcode.com/2020/day/12 */

/**
 * Part 1
 */
function part1() {
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

    const counter = {
      E: 0,
      W: 0,
      N: 0,
      S: 0,
    };

    let currentDirection = "E";

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

    const manhattanDistance =
      Math.abs(counter.E - counter.W) + Math.abs(counter.N - counter.S);
    console.log(
      `Manhattan distance between first location and second is ${manhattanDistance}`
    );
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  function getDirectionIndex(direction, sides) {
    for (let i = 0; i < sides.length; i++) {
      if (sides[i] === direction) {
        return { index: i, waypoint: direction };
      }
    }
  }

  function setPosition(position, waypoint, currentWayPoint, num) {
    if (currentWayPoint[0] === "N") {
      position.N += Math.abs(position.S - waypoint[currentWayPoint[0]] * num);
      position.S = position.S - position.N < 0 ? 0 : position.S - position.N;
    } else {
      position.S += Math.abs(position.N - waypoint[currentWayPoint[0]] * num);
      position.N = position.N - position.S < 0 ? 0 : position.N - position.S;
    }

    if (currentWayPoint[1] === "E") {
      position.E += Math.abs(position.W - waypoint[currentWayPoint[1]] * num);
      position.W = position.W - position.E < 0 ? 0 : position.W - position.E;
    } else if (currentWayPoint[1] === "W") {
      position.W += Math.abs(position.E - waypoint[currentWayPoint[1]] * num);
      position.E = position.E - position.W < 0 ? 0 : position.E - position.W;
    }
  }

  function getNewDirection(currentWayPoint, waypoint, side, num) {
    const sides = ["N", "E", "S", "W"];
    const oldWaypoint = {
      E: waypoint.E,
      W: waypoint.W,
      N: waypoint.N,
      S: waypoint.S,
    };

    const numOfMoves = num / 90;
    // R

    if (side === "R") {
      sides.forEach((geographicalSide, index) => {
        if (index + numOfMoves < sides.length) {
          waypoint[sides[index + numOfMoves]] = oldWaypoint[sides[index]];
        } else {
          let diff = Math.abs(sides.length - (index + numOfMoves));
          waypoint[sides[diff]] = oldWaypoint[sides[index]];
        }
      });
    } else {
      sides.forEach((geographicalSide, index) => {
        if (index - numOfMoves >= 0) {
          waypoint[sides[index - numOfMoves]] = oldWaypoint[sides[index]];
        } else {
          let diff = sides.length - Math.abs(index - numOfMoves);
          waypoint[sides[diff]] = oldWaypoint[sides[index]];
        }
      });
    }

    const currentDirectionIndexes = [
      getDirectionIndex(currentWayPoint[0], sides),
      getDirectionIndex(currentWayPoint[1], sides),
    ];

    const returnWaypoint = [];

    for (const currentDirection of currentDirectionIndexes) {
      if (side === "L") {
        if (currentDirection.index - num / 90 < 0) {
          let diff = sides.length - Math.abs(currentDirection.index - num / 90);

          if (sides[diff] === "N" || sides[diff] === "S") {
            returnWaypoint[0] = sides[diff];
          } else {
            returnWaypoint[1] = sides[diff];
          }
        } else {
          let newSide = sides[currentDirection.index - num / 90];
          if (newSide === "N" || newSide === "S") {
            returnWaypoint[0] = newSide;
          } else {
            returnWaypoint[1] = newSide;
          }
        }
      } else {
        if (currentDirection.index + num / 90 >= sides.length) {
          let diff = Math.abs(
            sides.length - (currentDirection.index + num / 90)
          );
          if (sides[diff] === "N" || sides[diff] === "S") {
            returnWaypoint[0] = sides[diff];
          } else {
            returnWaypoint[1] = sides[diff];
          }
        } else {
          const newSide = sides[currentDirection.index + num / 90];
          if (newSide === "N" || newSide === "S") {
            returnWaypoint[0] = newSide;
          } else {
            returnWaypoint[1] = newSide;
          }
        }
      }
    }

    return returnWaypoint; //?
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
    };

    let currentWayPoint = ["N", "E"];

    arrayOfInputs.forEach((command) => {
      let action = command[0];
      let num = parseInt(command.slice(1));

      switch (action) {
        case "N":
        case "S":
        case "E":
        case "W":
          waypoint[action] += num;
          break;

        case "L":
        case "R":
          currentWayPoint = getNewDirection(
            currentWayPoint,
            waypoint,
            action,
            num
          );
          break;

        case "F":
          setPosition(position, waypoint, currentWayPoint, num);
          break;
      }
    });

    const manhattanDistance =
      Math.abs(position.E - position.W) + Math.abs(position.N - position.S);

    console.log(
      `Manhattan distance between first location and second is ${manhattanDistance}`
    );
  });
}
