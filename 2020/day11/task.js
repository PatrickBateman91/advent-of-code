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
        if (!nearbySeats.includes("#")) {
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

  let occupiedSeats = 0;
  simulateSeatingOrder(parsedInputs).forEach((row) =>
    row.forEach((seat) => {
      if (seat === "#") {
        occupiedSeats++;
      }
    })
  );
  console.log(`Total number of occupied seats is ${occupiedSeats}`);
});

/**
 * Part 2
 */

function getNearestHorizontalSeat(nearbySeats, row, seatIndex, inc) {
  for (let i = inc; row[seatIndex + i] !== undefined; i += inc) {
    if (row[seatIndex + i] === ".") {
      continue;
    } else {
      nearbySeats.push(row[seatIndex + i]);
      break;
    }
  }
}

function getNearestVerticalSeat(
  arrayOfInputs,
  nearbySeats,
  rowIndex,
  seatIndex,
  inc
) {
  for (let i = inc; arrayOfInputs[rowIndex + i] !== undefined; i += inc) {
    if (arrayOfInputs[rowIndex + i][seatIndex] === ".") {
      continue;
    } else {
      nearbySeats.push(arrayOfInputs[rowIndex + i][seatIndex]);
      break;
    }
  }
}

function getNearestDiagonalSeat(
  arrayOfInputs,
  nearbySeats,
  rowIndex,
  seatIndex,
  rowInc,
  seatInc
) {
  for (
    let i = rowInc, j = seatInc;
    arrayOfInputs[rowIndex + i] !== undefined &&
    arrayOfInputs[rowIndex + i][seatIndex + j] !== undefined;
    i += rowInc, j += seatInc
  ) {
    if (arrayOfInputs[rowIndex + i][seatIndex + j] === ".") {
      continue;
    } else {
      nearbySeats.push(arrayOfInputs[rowIndex + i][seatIndex + j]);
      break;
    }
  }
}

function gatherNearbySeats(arrayOfInputs, row, rowIndex, seatIndex) {
  let nearbySeats = [];

  // Seats to the left
  getNearestHorizontalSeat(nearbySeats, row, seatIndex, -1);

  // Seats to the right
  getNearestHorizontalSeat(nearbySeats, row, seatIndex, 1);

  // Seats up
  getNearestVerticalSeat(arrayOfInputs, nearbySeats, rowIndex, seatIndex, -1);

  // Seats down
  getNearestVerticalSeat(arrayOfInputs, nearbySeats, rowIndex, seatIndex, 1);

  // Get diagonal top left
  getNearestDiagonalSeat(
    arrayOfInputs,
    nearbySeats,
    rowIndex,
    seatIndex,
    -1,
    -1
  );

  // Get diagonal top right
  getNearestDiagonalSeat(
    arrayOfInputs,
    nearbySeats,
    rowIndex,
    seatIndex,
    -1,
    1
  );

  // Get diagonal bottom left
  getNearestDiagonalSeat(
    arrayOfInputs,
    nearbySeats,
    rowIndex,
    seatIndex,
    1,
    -1
  );

  // Get diagonal bottom right
  getNearestDiagonalSeat(arrayOfInputs, nearbySeats, rowIndex, seatIndex, 1, 1);

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
        if (!nearbySeats.includes("#")) {
          newArrayOfInputs[rowIndex][seatIndex] = "#";
          numberOfSeatsChanged++;
        }
      } else if (seat === "#") {
        if (nearbySeats.filter((s) => s === "#").length >= 5) {
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

  let occupiedSeats = 0;
  simulateSeatingOrder(parsedInputs).forEach((row) =>
    row.forEach((seat) => {
      if (seat === "#") {
        occupiedSeats++;
      }
    })
  );
  console.log(`Total number of occupied seats is ${occupiedSeats}`);
});
