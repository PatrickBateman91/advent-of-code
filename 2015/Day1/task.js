const fs = require("fs");

/* Link to task description: https://adventofcode.com/2015/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const instructions = data.split("");
    
    let floorLevel = 0;
    instructions.forEach(x => {
      if(x === "("){
        floorLevel++
      } else if(x === ")"){
        floorLevel--;
      }
    });

    console.log(`Final floor is: ${floorLevel}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;
    const instructions = data.split("");
    let basementFirstEntry = 0;

    let floorLevel = 0;

    for(let i = 0; i < instructions.length; i++){
      if(instructions[i] ==="("){
        floorLevel++
      } else if(instructions[i] === ")"){
        floorLevel--;
      }

      if(floorLevel < 0){
        basementFirstEntry = i;
        break;
      }
    }

    console.log(`First basement entry is at position: ${basementFirstEntry + 1}`);
  });
}
 part2();
