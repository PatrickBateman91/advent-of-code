/* Link to task description: https://adventofcode.com/2019/day/4 */

/**
 * Part 1
 */
function part1() {
  const puzzleInput = "136818-685979";
  let [num1, num2] = puzzleInput.split("-").map((s) => parseInt(s));
  let counter = 0;

  function passwordCriteriaCheck(numAsString) {
    let check = false;
    for (let i = 0; i < numAsString.length - 1; i++) {
      let num1 = parseInt(numAsString[i]);
      let num2 = parseInt(numAsString[i + 1]);
      if (num1 > num2) {
        return false;
      }

      if (num1 === num2) {
        check = true;
      }
    }

    return check;
  }

  for (let i = num1; i <= num2; i++) {
    const num = i.toString().split("");
    if (!passwordCriteriaCheck(num)) {
      continue;
    }

    counter++;
  }

  console.log(
    `Total numbers of password that match the current criteria is ${counter}`
  );
}
part1();

/**
 * Part 2
 */
function part2() {
  const puzzleInput = "136818-685979";
  let [num1, num2] = puzzleInput.split("-").map((s) => parseInt(s));
  let counter = 0;

  function passwordCriteriaCheck(numAsString) {
    let check = false;
    for (let i = 0; i < numAsString.length - 1; i++) {
      let num1 = parseInt(numAsString[i]);
      let num2 = parseInt(numAsString[i + 1]);
      if (num1 > num2) {
        return false;
      }

      if (num1 === num2) {
        let numAfter = parseInt(numAsString[i + 2]);
        let numBefore = parseInt(numAsString[i - 1]);
        if (num1 !== numBefore && num1 !== numAfter) {
          check = true;
        }
      }
    }

    return check;
  }

  for (let i = num1; i <= num2; i++) {
    const num = i.toString().split("");
    if (!passwordCriteriaCheck(num)) {
      continue;
    }

    counter++;
  }

  console.log(
    `Total numbers of password that match the current criteria is ${counter}`
  );
}

part2();
