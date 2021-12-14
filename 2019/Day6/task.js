const fs = require("fs");

/* Link to task description: https://adventofcode.com/2019/day/6 */

/**
 * Part 1
 */
function part1() {
  function getAllOrbits(orbit, orbitsHashMap, COM) {
    let sum = 1;
    if (!orbit) {
      return 0;
    }
    if (orbit && orbit !== COM) {
      sum += getAllOrbits(orbitsHashMap[orbit], orbitsHashMap, COM);
    }

    return sum;
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((i) => i.split(")"));
    const orbitsHashMap = {};
    const COM = "COM";

    arrayOfInputs.forEach((input) => {
      input;
      if (!orbitsHashMap.hasOwnProperty(input[1])) {
        orbitsHashMap[input[1]] = input[0];
      }
    });

    let sum = 0;

    arrayOfInputs.forEach((orbit) => {
      sum += getAllOrbits(orbitsHashMap[orbit[1]], orbitsHashMap, COM);
    });

    console.log(`Total number of direct and indirect orbits is ${sum}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  function getPathToCOM(hashMap, target, path = []) {
    if (target.parent) {
      path.push(target.parent);
      return getPathToCOM(hashMap, hashMap[target.parent], path);
    }

    return path;
  }

  function getNumberOfTransfers(orbit, target, orbitHashMap) {
    let pathOfYou = getPathToCOM(orbitHashMap, orbitHashMap[orbit.parent]);
    let pathOfSan = getPathToCOM(orbitHashMap, orbitHashMap[target.parent]);
    let closestPath;

    for (let i = 0; i < pathOfYou.length; i++) {
      let index = pathOfSan.findIndex((el) => el === pathOfYou[i]);

      if (index !== -1) {
        // +1 for both ends to reach common parent
        closestPath = index + 1 + (i + 1);
        break;
      }
    }
    return closestPath;
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((i) => i.split(")"));
    const orbitHashMap = {};
    const YOU = "YOU";
    const SAN = "SAN";

    arrayOfInputs.forEach((input) => {
      if (!orbitHashMap.hasOwnProperty(input[0])) {
        orbitHashMap[input[0]] = {
          children: [input[1]],
          parent: null,
        };
      } else {
        orbitHashMap[input[0]].children.push(input[1]);
      }

      if (!orbitHashMap.hasOwnProperty(input[1])) {
        orbitHashMap[input[1]] = {
          children: [],
          parent: input[0],
        };
      } else {
        orbitHashMap[input[1]].parent = input[0];
      }
    });

    let closestPath = getNumberOfTransfers(
      orbitHashMap[YOU],
      orbitHashMap[SAN],
      orbitHashMap
    );
    console.log(
      `Closest path between orbits ${SAN} and ${YOU} is ${closestPath}`
    );
  });
}

part2();
