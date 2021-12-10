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

//part1();

/**
 * Part 2
 */
function part2() {
  function getNumberOfTransfers(
    orbit,
    target,
    orbitWhoHashMap,
    orbitedByHashMap
  ) {
    let sum = 1;

    /**
     * Za svaku orbitu provjeriti proći kroz sva tijela koja je orbituje
     * Za svaku orbitu
     * orbitedByHashMap[orbit]
     */

    return sum;
  }

  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const arrayOfInputs = data.split("\n").map((i) => i.split(")"));
    const orbitedByHashMap = {};
    const orbitWhoHashMap = {};
    const YOU = "YOU";
    const SAN = "SAN";

    arrayOfInputs.forEach((input) => {
      if (!orbitedByHashMap.hasOwnProperty(input[0])) {
        orbitedByHashMap[input[0]] = [input[1]];
      } else {
        orbitedByHashMap[input[0]].push(input[1]);
      }

      if (!orbitWhoHashMap.hasOwnProperty(input[1])) {
        orbitWhoHashMap[input[1]] = input[0];
      }
    });

    console.log("Orbited by: ");
    console.log(orbitedByHashMap);
    console.log("Orbits who:");
    console.log(orbitWhoHashMap);

    let sum = getNumberOfTransfers(
      orbitWhoHashMap[YOU],
      orbitWhoHashMap[SAN],
      orbitWhoHashMap,
      orbitedByHashMap
    );
  });
}

part2();
