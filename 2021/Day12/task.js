const fs = require("fs");

/* Link to task description: https://adventofcode.com/2021/day/12 */

/**
 * Part 1
 */
function part1() {
  const start = "start";
  const target = "end";
  function isBigCave(letter) {
    return letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90;
  }

  function findAllPaths(
    caveHashMap,
    arrayOfCaves,
    currentPath = [],
    count = 0
  ) {
    for (const cave of arrayOfCaves) {
      if (cave === start) {
        continue;
      }
      // A - c - A -
      if (cave === target) {
        count++;
        //currentPath = "";
        return count;
      }

      // Ako je big Cave ili ako ne postoji u trenutnom chainu => dodaj u current path, digni count, pozovi djecu
      if (caveHashMap[cave].isBigCave || currentPath.indexOf(cave) === -1) {
        currentPath.push(cave);
        count += findAllPaths(
          caveHashMap,
          caveHashMap[cave].adjacent,
          currentPath
        );
      }
    }

    return currentPath;
  }

  fs.readFile("./2021/Day12/input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n");
    const caveHashMap = {};

    for (const input of arrayOfInputs) {
      const inputSplit = input.split("-");

      if (caveHashMap.hasOwnProperty(inputSplit[0])) {
        caveHashMap[inputSplit[0]].adjacent.push(inputSplit[1]);
      } else {
        caveHashMap[inputSplit[0]] = {
          isBigCave: isBigCave(inputSplit[0]),
          adjacent: [inputSplit[1]],
        };
      }

      if (caveHashMap.hasOwnProperty(inputSplit[1])) {
        caveHashMap[inputSplit[1]].adjacent.push(inputSplit[0]);
      } else {
        caveHashMap[inputSplit[1]] = {
          isBigCave: isBigCave(inputSplit[1]),
          adjacent: [inputSplit[0]],
        };
      }
    }

    try {
      let allPaths = findAllPaths(caveHashMap, caveHashMap.start.adjacent);
      console.log(allPaths);
    } catch (err) {
      console.log(err);
    }
  });
}

part1();
