const fs = require("fs");

/**
 * Part 1
 */

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
});
