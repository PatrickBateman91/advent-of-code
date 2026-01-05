const fs = require("fs");

/* Link to task description: https://adventofcode.com/2016/day/1 */

/**
 * Part 1
 */
function part1() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const instructions = data.split(", ");
    const directions = ["UP", "RIGHT", "DOWN", "LEFT",];
    let coordinates = [0, 0];
    let currentDirection = "UP";

    instructions.forEach(instruction => {
      var nextTurn = instruction[0];
      var numberOfMoves = parseInt(instruction.slice(1));
      currentDirection = getNextDirection(directions, currentDirection, nextTurn);
      coordinates = getNewCoordinates(coordinates, currentDirection, numberOfMoves);
    });

    console.log(`Final Manhattan distance is : ${Math.abs(coordinates[0]) + Math.abs(coordinates[1])}`);
  });
}

function getNextDirection(directions, currentDirection, nextTurn){
  var index = directions.indexOf(currentDirection);

  if(nextTurn === "R"){
      index++;
  } else if(nextTurn === "L"){
      index--;
  } 

  if(index < 0){
    index = 3;
  } else if(index > 3){
    index = 0;
  }

  return directions[index];
}

function getNewCoordinates(currentCoordinates, direction, numberOfMoves){
  if(direction === "UP"){
    return [currentCoordinates[0], currentCoordinates[1] + numberOfMoves];
  } 
  else if(direction === "DOWN"){
    return [currentCoordinates[0], currentCoordinates[1] - numberOfMoves];
  } 
  else if(direction === "LEFT"){
    return [currentCoordinates[0] - numberOfMoves, currentCoordinates[1]];
  } 
  else if(direction === "RIGHT"){
    return [currentCoordinates[0] + numberOfMoves, currentCoordinates[1]];
  }

  throw new Error("Unsupported direction");
}

part1();

/**
 * Part 2
 */
function part2() {
  fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) throw err;

    const instructions = data.split(", ");
    const directions = ["UP", "RIGHT", "DOWN", "LEFT",];
    let coordinates = [0, 0];
    let currentDirection = "UP";
    let coordinatesDictionary = {
      "0,0":""
    };
    let firstLocationToVisitTwice;

    for(let i = 0; i < instructions.length; i++){
      var instruction = instructions[i];
      var nextTurn = instruction[0];
      var numberOfMoves = parseInt(instruction.slice(1));
      currentDirection = getNextDirection(directions, currentDirection, nextTurn);

      for(let j = 0; j < numberOfMoves; j++){
        coordinates = getNewCoordinates(coordinates, currentDirection, 1);

        if(coordinatesDictionary[coordinates] !== undefined){
          firstLocationToVisitTwice = coordinates;
          break;
        }else{
          coordinatesDictionary[coordinates] = coordinates;
        }
      }

      if(firstLocationToVisitTwice){
        break;
      }
    }
    console.log(`Manhattan distance for first location visited twice is : ${Math.abs(coordinates[0]) + Math.abs(coordinates[1])}`);
  });
}

 part2();
