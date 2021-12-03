const fs = require("fs");

/**
 * Part 1
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const groups = [];

  let tempGroup = [];
  for (const input of arrayOfInputs) {
    if (input === "") {
      groups.push(tempGroup);
      tempGroup = [];
    } else {
      tempGroup.push(input);
    }
  }

  const groupCount = groups
    .map((group) => {
      const uniqueAnswers = [];

      group.forEach((memberAnswers) => {
        const answers = memberAnswers.split("");
        answers.forEach((answer) => {
          if (!uniqueAnswers.includes(answer)) {
            uniqueAnswers.push(answer);
          }
        });
      });

      return uniqueAnswers.length;
    })
    .reduce((prev, val) => {
      return prev + val;
    });

  console.log(`Total count of unique answers by all groups is ${groupCount}`);
});

/**
 * Part 2
 */
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const groups = [];

  let tempGroup = [];
  for (const input of arrayOfInputs) {
    if (input === "") {
      groups.push(tempGroup);
      tempGroup = [];
    } else {
      tempGroup.push(input);
    }
  }

  const groupCount = groups
    .map((group) => {
      const uniqueAnswers = [];

      group.forEach((memberAnswers) => {
        const answers = memberAnswers.split("");
        answers.forEach((answer) => {
          let answerFound = false;
          for (const uniqueAnswer of uniqueAnswers) {
            if (uniqueAnswer.id === answer) {
              uniqueAnswer.count++;
              answerFound = true;
            }
          }

          if (!answerFound) {
            uniqueAnswers.push({ id: answer, count: 1 });
          }
        });
      });
      return uniqueAnswers.filter((a) => a.count === group.length).length;
    })
    .reduce((prev, val) => {
      return prev + val;
    });

  console.log(
    `Total count of unique answers that were answered yes by all group members is: ${groupCount}`
  );
});
