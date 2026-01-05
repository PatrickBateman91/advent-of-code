const fs = require("fs");

/* Link to task description: https://adventofcode.com/2016/day/2 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const instructions = data.replace(/\r/g, "").split("\n");
    const UP = "U";
    const DOWN = "D";
    const LEFT = "L";
    const RIGHT = "R";
    let previousPosition = [1,1];
    let nums = {
      "00": "1",
      "10": "2",
      "11": "3",
      "01": "4",
      "11": "5",
      "21": "6",
      "02": "7",
      "12": "8",
      "22": "9",
    }
    let finalKeypad = "";

    instructions.forEach(instruction => {
      var commands = instruction.split("");
      commands.forEach(command => {
        if(command === UP){
          if(previousPosition[1] > 0){
            previousPosition[1]--;
          }
        } else if(command === DOWN){
          if(previousPosition[1] < 2){
            previousPosition[1]++;
          }
        } else if(command === RIGHT) {
          if(previousPosition[0] < 2){
            previousPosition[0]++;
          }
        } else if(command === LEFT){
          if(previousPosition[0] > 0){
            previousPosition[0]--
          }
        }
      });
      
      finalKeypad += nums[`${previousPosition[0]}${previousPosition[1]}`];
    });

    console.log(`Bathroom code is : ${finalKeypad}`);
  });
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const instructions = data.replace(/\r/g, "").split("\n");
    const UP = "U";
    const DOWN = "D";
    const LEFT = "L";
    const RIGHT = "R";
    let previousPosition = [0,2];
    let nums = {
      "20": "1",
      "11": "2",
      "21": "3",
      "31": "4",
      "02": "5",
      "12": "6",
      "22": "7",
      "32": "8",
      "42": "9",
      "13": "A",
      "23": "B",
      "33": "c",
      "24": "D"
    }
    let rowPositions = {
      0: [2],
      1: [1, 2, 3],
      2: [0, 1, 2, 3, 4],
      3: [1, 2, 3],
      4: [2]
    };
    let finalKeypad = "";

    instructions.forEach(instruction => {
      var commands = instruction.split("");
      commands.forEach(command => {
        if(command === UP){
          var newRow = rowPositions[previousPosition[1] - 1];
          if(newRow !== undefined && newRow.includes(previousPosition[0]))
            previousPosition[1]--;
        } else if(command === DOWN){
          var newRow = rowPositions[previousPosition[1] + 1];
          if(newRow !== undefined && newRow.includes(previousPosition[0]))
            previousPosition[1]++;
        } else if(command === RIGHT) {
          if(rowPositions[previousPosition[1]].includes(previousPosition[0] + 1)){
            previousPosition[0]++;
          }
        } else if(command === LEFT){
          if(rowPositions[previousPosition[1]].includes(previousPosition[0] - 1)){
            previousPosition[0]--
          }
        }
      });
      
      finalKeypad += nums[`${previousPosition[0]}${previousPosition[1]}`];
    });

    console.log(`Bathroom code is : ${finalKeypad}`);
  });
}

 part2();
