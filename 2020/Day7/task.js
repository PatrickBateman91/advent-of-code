const fs = require("fs");

/**
 * Part 1
 */
function getAllBags(allBags, bagsThatContainDirectly, target) {
  for (const bag of allBags) {
    const bagSplit = bag.split("contain");
    const namePart = bagSplit[0].trim().replace("bags", "bag");
    if (namePart === target) {
      continue;
    }

    const containerPart = bagSplit[1];
    for (const bagThatContains of bagsThatContainDirectly) {
      if (containerPart && containerPart.indexOf(bagThatContains) !== -1) {
        if (!bagsThatContainDirectly.includes(namePart)) {
          bagsThatContainDirectly.push(namePart);
          return getAllBags(allBags, bagsThatContainDirectly, target);
        } else {
          break;
        }
      }
    }
  }

  return bagsThatContainDirectly;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const target = "shiny gold bag";
  const bagsThatContainDirectly = arrayOfInputs
    .filter((bag) => {
      return bag.indexOf(target) !== -1;
    })
    .map((bag) => {
      const name = bag.split("contain")[0].trim().replace("bags", "bag");
      return name !== target ? name : null;
    })
    .filter((bag) => bag);

  const finalArrayOfBags = getAllBags(
    arrayOfInputs,
    bagsThatContainDirectly,
    target
  );
  console.log(
    `Total number of bags that can hold shitty gold bag is: ${finalArrayOfBags.length}`
  );
});

/**
 * Part 2
 */

function getTotalBackCount(hashMap, arrayOfBags) {
  let sum = 1;

  for (const bag of arrayOfBags) {
    sum += bag.amount * getTotalBackCount(hashMap, hashMap[bag.bagName]);
  }

  return sum;
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) throw err;
  const arrayOfInputs = data.split("\n");
  const hashMap = {};

  for (const input of arrayOfInputs) {
    const [name, content] = input.split("contain");
    const insideBagArray = content.split(",").map((i) => i.trim());
    let tempArr = [];
    insideBagArray.forEach((bag) => {
      if (/\d/.test(bag)) {
        const bagSplit = bag.split(" ");
        tempArr.push({
          amount: parseInt(bagSplit[0]),
          bagName: `${bagSplit.slice(1).join(" ").replace(".", "").trim()}${
            parseInt(bagSplit[0]) === 1 ? "s" : ""
          }`,
        });
      }
    });
    hashMap[name.trim()] = tempArr;
  }
  const target = "shiny gold bags";
  let sum = getTotalBackCount(hashMap, hashMap[target]);
  console.log(`Total bag sum is: ${sum - 1}`);
});
