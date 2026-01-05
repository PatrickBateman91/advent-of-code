const fs = require("fs");
const { start } = require("repl");

/* Link to task description: https://adventofcode.com/2023/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const calibrations = data.split("\n");
    let sum = 0;
    for(let i = 0; i < calibrations.length; i++){
      var characters = calibrations[i].split("");
      var firstNum = getFirstNum(characters);
      var secondNum = getLastNum(characters);

      if(secondNum === undefined)
          secondNum = firstNum;

      if(firstNum !== undefined && secondNum !== undefined){
        sum += parseInt(firstNum + secondNum);
      }
    }

    console.log(`Sum of all calibration values is: ${sum}`);
  });
}

function getFirstNum(characters){
  for(let i = 0; i < characters.length; i++){
    if(!isNaN(parseInt(characters[i]))){
      return characters[i];
    }
  }
}

function getLastNum(characters){
  for(let i = characters.length - 1; i >= 0; i--){
    if(!isNaN(parseInt(characters[i]))){
      return characters[i];
    }
  }
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const numsAsWords = {
      "one" : "1",
      "two" : "2",
      "three" : "3",
      "four" : "4",
      "five" : "5",
      "six" : "6",
      "seven" : "7",
      "eight" : "8",
      "nine" : "9"
    }

    const calibrations = data.split("\n");
    let sum = 0;
    for(let i = 0; i < calibrations.length; i++){
      var characters = calibrations[i].split("");
      var arrayOfNumIndexes = getNumIndexes(characters, numsAsWords);

      if(arrayOfNumIndexes.length > 0){
        arrayOfNumIndexes.sort((a, b) => a[0] - b[0]);

        var firstNum = arrayOfNumIndexes[0][1];
        let secondNum;

        if(arrayOfNumIndexes.length === 1){
          secondNum = firstNum;
        } else{
          secondNum = arrayOfNumIndexes[arrayOfNumIndexes.length - 1][1];
        }

        sum += parseInt(firstNum + secondNum);
      }
    }

    console.log(`Sum of all calibration values is: ${sum}`);
  });
}

function getNumIndexes(characters, numsAsWords){
  let indexes = [];

  characters.forEach((character, idx) => {
    if(!isNaN(parseInt(character))){
      indexes.push([idx, character]);
    }
  })
  
  let joinedCharacters = characters.join("");
  Object.keys(numsAsWords).forEach(numAsWord => {
    let startingPosition = 0;

      while(joinedCharacters.indexOf(numAsWord, startingPosition) !== -1){
        var foundMatch = joinedCharacters.indexOf(numAsWord, startingPosition);
        indexes.push([foundMatch, numsAsWords[numAsWord]]);
        startingPosition = foundMatch + numAsWord.length;
      }
  });

  return indexes;
}

 part2();
