const fs = require("fs");

/* Link to task description: https://adventofcode.com/2025/day/10 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const indicatorData = {};

    // Parse data
    data.split("\n").forEach((row, rowIdx) => {
      row.split(" ").forEach((rowItem) => {
        if (indicatorData[rowIdx] === undefined)
          indicatorData[rowIdx] = {
            Indicators: [],
            Buttons: [],
            Min: Number.MAX_SAFE_INTEGER,
          };
        // Handle indicators
        if (rowItem[0] === "[")
          indicatorData[rowIdx].Indicators = rowItem.slice(
            1,
            rowItem.length - 1
          );

        // Handle buttons
        if (rowItem[0] === "(") {
          indicatorData[rowIdx].Buttons.push(
            rowItem
              .slice(1, rowItem.length - 1)
              .split(",")
              .map((x) => parseInt(x))
          );
        }
      });
    });

    let currentRowIdx = 0;
    while (
      currentRowIdx < 2 ||
      Object.values(indicatorData).every(
        (x) => x.Min !== Number.MAX_SAFE_INTEGER
      )
    ) {
      console.log(currentRowIdx);
      var currentButtons = indicatorData[currentRowIdx].Buttons;
      var desiredConfiguration = indicatorData[currentRowIdx].Indicators;
      var currentMin = Number.MAX_SAFE_INTEGER;
      var combinations = getAllCombinationsForButton(currentButtons);

      // // Get all possible combinations
      // for (let i = 0; i < currentButtons.length; i++) {
      //   var buttonCombinations =
      //   combinations.push(...buttonCombinations);
      // }

      // Calculate all combinations
      //combinations = [[[3], [1, 3], [2]]];
      for (let i = 0; i < combinations.length; i++) {
        let reachedDesiredPattern = false;
        let currentConfiguration = new Array(desiredConfiguration.length)
          .fill(".")
          .join("");

        let tempMin = Number.MAX_SAFE_INTEGER;

        for (let j = 0; j < combinations[i].length; j++) {
          if (j > tempMin) break;

          currentConfiguration = pressButton(
            currentConfiguration,
            combinations[i][j]
          );

          // console.log(
          //   `Comparing: ${currentConfiguration} vs ${desiredConfiguration}`
          // );
          if (currentConfiguration === desiredConfiguration) {
            reachedDesiredPattern = true;
            tempMin = j;
            break;
          }
        }

        if (reachedDesiredPattern && tempMin < currentMin) currentMin = tempMin;
      }

      // Save min and move to next row
      indicatorData[currentRowIdx].Min = currentMin;
      currentRowIdx++;
    }

    console.log(indicatorData);

    // remove buttons which can't control anything if any
    // Recursively (performance wise from from while loop) you need to make runs from each buttons and have other button positions as alternative timelines. Save each min, so you can early return.
    // Starting position if all off?
    // So how many times do we click each button before continuing with the next button? Until we hit repeat or something?

    //console.log(`Max square are between two red tiles is: ${maxSquareCount}`);
  });
}

function pressButton(currentConfiguration, buttonIndexes) {
  buttonIndexes.forEach((buttonIdx) => {
    currentConfiguration =
      currentConfiguration.substring(0, buttonIdx) +
      (currentConfiguration[buttonIdx] === "#" ? "." : "#") +
      currentConfiguration.substring(buttonIdx + 1);
  });

  return currentConfiguration;
}

function getAllCombinationsForButton(buttons) {
  var combinations = [];
  for (let i = 0; i < buttons.length; i++) {
    if (i === 0) {
      combinations.push([buttons[i]]);
      combinations.push([buttons[i], buttons[i]]);
      continue;
    }

    var combinationsToAdd = [];

    for (let j = 0; j < buttons.length; j++) {
      combinations.forEach((combination) => {
        var combo1 = combination.toSpliced(j, 0, buttons[i]);
        var combo2 = combination.toSpliced(j, 0, buttons[i], buttons[i]);
        combinationsToAdd.push(combo1);
        combinationsToAdd.push(combo2);
      });
    }

    combinations = combinationsToAdd;

    // svaki index: kreiraj

    /**
     * Index 0 kreira sebe 1x i 2x
     * Index 1 doda nove dvije kombinacije koji su duplikati prethodnih + sebe doda 1x i 2x na obje
     * Index 2 doda prethodne duplikate i doda sebe na sve druge pozicije osim 0
     * Index 3 duplicira prethodne i doda sebe na sve druge pozicije osim na 0
     */
  }

  return combinations;
}

part1();

/**
 * Part 2
 */
// function part2() {
//   fs.readFile("input.txt", "utf-8", function (err, data) {
//     if (err) throw err;

//     const eligibleRowPositions = {};

//     var redTileCoordinates = [];
//     var rows = data.split("\n");
//     rows.forEach((row) => {
//       var coordinates = row.split(",");

//       if (eligibleRowPositions[coordinates[1]] === undefined)
//         eligibleRowPositions[coordinates[1]] = [];

//       eligibleRowPositions[coordinates[1]].push(parseInt(coordinates[0]));
//       redTileCoordinates.push(coordinates.map((x) => parseInt(x)));
//     });

//     // Mark all green tiles by straight line
//     for (let i = 0; i < redTileCoordinates.length; i++) {
//       var row1, row2;

//       if (i === redTileCoordinates.length - 1) {
//         row1 = redTileCoordinates[i];
//         row2 = redTileCoordinates[0];
//       } else {
//         row1 = redTileCoordinates[i];
//         row2 = redTileCoordinates[i + 1];
//       }

//       var greenTilesInBetween = getTilesInBetween(row1, row2);
//       greenTilesInBetween.forEach((tileCoordinate) => {
//         if (eligibleRowPositions[tileCoordinate[1]] === undefined)
//           eligibleRowPositions[tileCoordinate[1]] = [];

//         eligibleRowPositions[tileCoordinate[1]].push(tileCoordinate[0]);
//       });
//     }

//     const eligibleRowBoundaries = {};

//     // Add looped green tiles
//     Object.entries(eligibleRowPositions).forEach(([key, value]) => {
//       eligibleRowBoundaries[key] = [Math.min(...value), Math.max(...value)];
//     });

//     console.log(eligibleRowBoundaries);

//     // Calculate max square area
//     let maxSquareCount = 0;

//     var sortedRedLineCoordinatesByRow = redTileCoordinates.sort(
//       (a, b) => a[1] - b[1]
//     );
//     //console.log(sortedRedLineCoordinatesByRow);

//     for (let i = 0; i < sortedRedLineCoordinatesByRow.length; i++) {
//       for (let j = i; j < sortedRedLineCoordinatesByRow.length; j++) {
//         if (
//           i === j ||
//           !isCoordinateCombinationEligible(
//             sortedRedLineCoordinatesByRow[i],
//             sortedRedLineCoordinatesByRow[j],
//             eligibleRowBoundaries
//           )
//         )
//           continue;

//         var squareCountCandidate = calcSquares(
//           sortedRedLineCoordinatesByRow[i],
//           sortedRedLineCoordinatesByRow[j]
//         );
//         if (squareCountCandidate > maxSquareCount)
//           maxSquareCount = squareCountCandidate;
//       }
//     }

//     console.log(`Max square are between two red tiles is: ${maxSquareCount}`);
//   });
// }

// part2();
