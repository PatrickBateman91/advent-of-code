const fs = require("fs");

/**
 * Part 1
 */

const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function checkFields(sentence) {
  for (const field of mandatoryFields) {
    if (sentence.indexOf(`${field}:`) === -1) {
      return false;
    }
  }

  return true;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  let tempString = "";
  let numberOfValidPassports = 0;

  arrayOfInputs.forEach((inputString) => {
    if (inputString === "") {
      let trimmedSentence = tempString.trim();
      if (checkFields(trimmedSentence)) {
        numberOfValidPassports++;
      }
      tempString = "";
    } else {
      tempString += ` ${inputString}`;
    }
  });

  console.log(`Number of valid passports is: `, numberOfValidPassports);
});

/**
 * Part 2
 */

const mandatoryFields2 = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const checkPassportValidity = (passport) => {
  const parsedBYR = parseInt(passport.byr);

  if (!parsedBYR || parsedBYR < 1920 || parsedBYR > 2002) {
    return false;
  }

  const parsedIYR = parseInt(passport.iyr);

  if (!parsedIYR || parsedIYR < 2010 || parsedIYR > 2020) {
    return false;
  }

  const parsedEYR = parseInt(passport.eyr);

  if (!parsedEYR || parsedEYR < 2020 || parsedEYR > 2030) {
    return false;
  }

  if (passport.hgt && passport.hgt.indexOf("cm") !== -1) {
    const height = parseInt(passport.hgt.replace("cm", ""));
    if (!height || height < 150 || height > 193) {
      return false;
    }
  } else if (passport.hgt && passport.hgt.indexOf("in") !== -1) {
    const height = parseInt(passport.hgt.replace("in", ""));
    if (!height || height < 59 || height > 76) {
      return false;
    }
  } else return false;

  const hairTestRegex = new RegExp("[^0-9a-f#]");
  if (
    !passport.hcl ||
    passport.hcl[0] !== "#" ||
    passport.hcl.length !== 7 ||
    hairTestRegex.test(passport.hcl)
  ) {
    return false;
  }

  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  if (!validEyeColors.includes(passport.ecl)) {
    return false;
  }

  if (!passport.pid || passport.pid.length !== 9) {
    return false;
  }

  return true;
};

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  let tempString = "";
  let numberOfValidPassports = 0;
  let arrayOfPassports = [];

  arrayOfInputs.forEach((inputString) => {
    if (inputString === "") {
      let trimmedSentenceArray = tempString.trim().split(" ");
      let passport = {};
      for (const sentence of trimmedSentenceArray) {
        const [key, value] = sentence.split(":");
        passport[key] = value;
      }

      arrayOfPassports.push(passport);
      tempString = "";
    } else {
      tempString += ` ${inputString}`;
    }
  });

  for (const passport of arrayOfPassports) {
    if (Object.keys(passport).length < mandatoryFields2.length) {
      continue;
    }

    if (checkPassportValidity(passport)) {
      numberOfValidPassports++;
    }
  }

  console.log(`Number of valid passports is: `, numberOfValidPassports);
});
