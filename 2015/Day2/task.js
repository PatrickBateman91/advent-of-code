const fs = require("fs");

/* Link to task description: https://adventofcode.com/2015/day/2 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const boxes = data.replace(/\r/g, "").split("\n");
    let total = 0;

    boxes.forEach(box => {
      var dimensions = box.split("x").map(x => parseInt(x));
      dimensions.sort((a, b) => a- b);
      total += (2 * dimensions[0] * dimensions[1]) + (2 * dimensions[0] * dimensions[2]) + (2 * dimensions[1] * dimensions[2]) + (dimensions[0] * dimensions[1]);
    })

    console.log(`Total square feed of wrapping paper needed is: ${total}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const boxes = data.replace(/\r/g, "").split("\n");
    let ribbonTotal = 0;

    boxes.forEach(box => {
      var dimensions = box.split("x").map(x => parseInt(x));
      var length = dimensions[0];
      var width = dimensions[1];
      var height = dimensions[2];

      var perimeter1 = 2 * (length + width);
      var perimeter2 = 2 * (width + height);
      var perimeter3 = 2 * (height + length);

      ribbonTotal += Math.min(perimeter1, perimeter2, perimeter3) + (dimensions[0] * dimensions[1] * dimensions[2]); 
    })

    console.log(`Total feet of ribbon needed is: ${ribbonTotal}`);
  });
}
 part2();
