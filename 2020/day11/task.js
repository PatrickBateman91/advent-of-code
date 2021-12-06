const fs = require("fs");

/**
 * Part 1
 */

function gatherNearbySeats(arrayOfInputs, row, rowIndex, seatIndex) {
  let nearbySeats = [];

  if (row[seatIndex - 1]) {
    nearbySeats.push(row[seatIndex - 1]);
  }

  if (row[seatIndex + 1]) {
    nearbySeats.push(row[seatIndex + 1]);
  }

  if (arrayOfInputs[rowIndex - 1] && arrayOfInputs[rowIndex - 1][seatIndex]) {
    nearbySeats.push(arrayOfInputs[rowIndex - 1][seatIndex]);
  }

  if (arrayOfInputs[rowIndex + 1] && arrayOfInputs[rowIndex + 1][seatIndex]) {
    nearbySeats.push(arrayOfInputs[rowIndex + 1][seatIndex]);
  }

  if (
    arrayOfInputs[rowIndex - 1] &&
    arrayOfInputs[rowIndex - 1][seatIndex - 1]
  ) {
    nearbySeats.push(arrayOfInputs[rowIndex - 1][seatIndex - 1]);
  }

  if (
    arrayOfInputs[rowIndex - 1] &&
    arrayOfInputs[rowIndex - 1][seatIndex + 1]
  ) {
    nearbySeats.push(arrayOfInputs[rowIndex - 1][seatIndex + 1]);
  }

  if (
    arrayOfInputs[rowIndex + 1] &&
    arrayOfInputs[rowIndex + 1][seatIndex - 1]
  ) {
    nearbySeats.push(arrayOfInputs[rowIndex + 1][seatIndex - 1]);
  }

  if (
    arrayOfInputs[rowIndex + 1] &&
    arrayOfInputs[rowIndex + 1][seatIndex + 1]
  ) {
    nearbySeats.push(arrayOfInputs[rowIndex + 1][seatIndex + 1]);
  }
  return nearbySeats;
}

function simulateSeatingOrder(arrayOfInputs) {
  let rowIndex = 0;
  let numberOfSeatsChanged = 0;
  let newArrayOfInputs = JSON.parse(JSON.stringify(arrayOfInputs));

  for (const row of arrayOfInputs) {
    let seatIndex = 0;

    for (const seat of row) {
      const nearbySeats = gatherNearbySeats(
        arrayOfInputs,
        row,
        rowIndex,
        seatIndex
      );

      if (seat === "L") {
        if (nearbySeats.includes("L")) {
          newArrayOfInputs[rowIndex][seatIndex] = "#";
          numberOfSeatsChanged++;
        }
      } else if (seat === "#") {
        if (nearbySeats.filter((s) => s === "#").length >= 4) {
          newArrayOfInputs[rowIndex][seatIndex] = "L";
          numberOfSeatsChanged++;
        }
      }

      seatIndex++;
    }

    rowIndex++;
  }

  if (numberOfSeatsChanged > 0) {
    return simulateSeatingOrder(newArrayOfInputs);
  } else return newArrayOfInputs;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const parsedInputs = arrayOfInputs.map((row) => {
    return row.split("");
  });

  const finalSeatingOrder = simulateSeatingOrder(parsedInputs);
});
