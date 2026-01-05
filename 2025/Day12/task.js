const fs = require("fs");

/* Link to task description: https://adventofcode.com/2025/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    /*
      Shapes dictionary:
      index key
      value: array of three za svaki row 
      ###
      .#.
      ###
      [[0,1,2], [1], [0,1,2]]

      Areas, stored in list, each area a dictionary:
      area: [4,4]
      index key: req
      index 0 : 3
    */

    const shapesDict = {};
    const areaList = [];

    // Split data
    let currentShape = [];
    let currentShapeIndex;
    const numberOfGifts = 5;
    let giftsMapped = 0;
    data.split("\n").forEach((row) => {
      // Handle shapes
      if (giftsMapped <= numberOfGifts) {
        // New shape start
        if (row[1] === ":") {
          currentShapeIndex = parseInt(row[0]);
        }

        // Shape row
        else if (row.trim() !== "") {
          var marks = row.split("");
          var shapeRowArray = [];

          marks.forEach((mark, idx) => {
            if (mark === "#") {
              shapeRowArray.push(idx);
            }
          });
          currentShape.push(shapeRowArray);
        } else {
          shapesDict[currentShapeIndex] = currentShape;
          currentShapeIndex = undefined;
          currentShape = [];
          giftsMapped++;
        }
      }

      // Handle areas
      else {
        var areaEntry = {};
        var [area, reqs] = row.split(":");
        var areaMarks = area.split("x");
        areaEntry.SpaceAvailable = [
          parseInt(areaMarks[0]),
          parseInt(areaMarks[1]),
        ];

        var reqItems = reqs.split(" ").filter((x) => x.trim() !== "");
        reqItems.forEach((reqItem, idx) => {
          areaEntry[idx] = parseInt(reqItem);
        });

        areaList.push(areaEntry);
      }
    });

    // Loop regions
    let areaIndex = 0;
    let validAreas = [];

    while (areaIndex < areaList.length) {
      // Array of array, svaki array uključuje jednu poziciju gifta, pa se puni s vremenom. Kad gift ne može da stane, miče se iz liste
      var updatedGiftPositions = [];
      // Za prvi poklon pronaći sve pozicije na koje može da stane, za svaki rotation (0, 90, 180, 270)
      // Za ostale pronaći sve pozicije u koje može da se uklopi s ostalim poklonima, i obrisati sve navalidne pozicije
      // Za posljednju iteraciju posljednjeg poklona pronaći prvu poziciju na kojoj se uklopi, i dodati u validAreas, resetovati sve temp varijable i dići area index

      // prvi gift treba stati 5 puta:
      // area je prazan:
      // prva iteracija:
      // vraća flat listu svi eligible pozicija za svaku svoju rotaciju: [{"0" : [0, 1,2], "1" : [1,2], "2" : [1], }, [...], [...]]

      // druga i svaka iduća iteracija:
      // prolazi kroz svaku listu prve iteracije i od nje pravi n listi: svaka pozicija unutar te liste gdje ona može stati je nova lista, za svaku rotaciju

      // treća iteracija
      // ako dođem do kraja trenutne liste, i nisam uspio dodati => markiraj listu kao invalidnu i izbriši je

      // funckije koje treba dodati: getRotatedShape (0, 90, 180. 270), fill area with current positions, create area, canFit?

      // Loop thru all gifts
      for (let i = 0; i < numberOfGifts; i++) {
        // Loop thru all instances of current gift
        for (let j = 0; j < areaList[areaIndex][i]; j++) {
          // Get all (8) shapes and flips
          var rotatedShapes = getRotatedShapes();
          const giftPossibilities = [];
          // Find all possible positions for a single shape
          for (let k = 0; k < rotatedShapes.length; k++) {
            // First iteration of the first gifts creates array, other always expand on it
            if (i === 0 && j === 0) {
              const initialPositions = getPossiblePositionsForFirstGift(
                rotatedShapes[k],
                areaList[areaIndex]
              );
              giftPossibilities.push(...initialPositions);
            } else {
              // Other iterations will always return full new list for that shape => merge all shapes once done and that will be new possibilities list
              var updatedPositions = getPossiblePositionsForOtherGifts(
                rotatedShapes[k],
                updatedGiftPositions,
                areaList[areaIndex]
              );
              giftPossibilities.push(...updatedPositions);
            }
          }

          // After gift is done => replace currently existing possibilities
          updatedGiftPositions = giftPossibilities;
        }
      }

      if (updatedGiftPositions.length === 0) areaIndex++;
    }

    console.log(shapesDict);
    console.log(areaList);
  });
}

function getRotatedShapes() {}

function getPossiblePositionsForOtherGifts(shape, currentPossibilities, area) {
  const updatedPossibilities = [];

  // Loop thru current possibilities, and either expand on them, or remove them
  for (let i = 0; i < currentPossibilities.length; i++) {
    for (let i = 0; i < area[0]; i++) {
      for (let j = 0; j < area[1]; j++) {
        const updatedArea = fillArea(area, currentPossibilities[i]);
        var shapePositions = canFitShape(shape, [i, j], updatedArea);

        if (shapePositions !== undefined)
          updatedPossibilities.push(shapePositions);
      }
    }
  }

  return updatedPossibilities;
}

function getPossiblePositionsForFirstGift(shape, area) {
  const possibilities = [];

  // Loop every row, every column and add all possibilities

  for (let i = 0; i < area[0]; i++) {
    for (let j = 0; j < area[1]; j++) {
      var shapePositions = canFitShape(shape, [i, j], area);

      if (shapePositions !== undefined) possibilities.push(shapePositions);
    }
  }

  return possibilities;
}

function canFitShape(shape, currentPosition, area) {}

function fillArea(area, currentPositions) {}

part1();

/**
 * Part 2
 */

// function part2() {
//   fs.readFile("input.txt", "utf-8", function (err, data) {
//     if (err) throw err;

//     data.split("\n").forEach((row) => {
//       const [start, path] = row.split(":");
//       const paths = path.split(" ").filter((x) => x !== "");

//       deviceDict[start] = paths;
//     });

//     var hitTracker = getCondensedPathsToOut("svr", {
//       fftHit: 0,
//       dacHit: 0,
//       bothHit: 0,
//       totalHits: 0,
//     });

//     console.log(`Total hit counter is ${hitTracker.bothHit}`);
//   });
// }

// part2();
