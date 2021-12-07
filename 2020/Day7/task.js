const { Console } = require("console");
const fs = require("fs");

/**
 * Part 1
 */
// function getAllBags(allBags, bagsThatContainDirectly, target) {
//   for (const bag of allBags) {
//     const bagSplit = bag.split("contain");
//     const namePart = bagSplit[0].trim().replace("bags", "bag");
//     if (namePart === target) {
//       continue;
//     }

//     const containerPart = bagSplit[1];
//     for (const bagThatContains of bagsThatContainDirectly) {
//       if (containerPart && containerPart.indexOf(bagThatContains) !== -1) {
//         if (!bagsThatContainDirectly.includes(namePart)) {
//           bagsThatContainDirectly.push(namePart);
//           return getAllBags(allBags, bagsThatContainDirectly, target);
//         } else {
//           break;
//         }
//       }
//     }
//   }

//   return bagsThatContainDirectly;
// }

// fs.readFile("input.txt", "utf-8", function (err, data) {
//   if (err) throw err;
//   const arrayOfInputs = data.split("\n");
//   const target = "shiny gold bag";
//   const bagsThatContainDirectly = arrayOfInputs
//     .filter((bag) => {
//       return bag.indexOf(target) !== -1;
//     })
//     .map((bag) => {
//       const name = bag.split("contain")[0].trim().replace("bags", "bag");
//       return name !== target ? name : null;
//     })
//     .filter((bag) => bag);

//   const finalArrayOfBags = getAllBags(
//     arrayOfInputs,
//     bagsThatContainDirectly,
//     target
//   );
//   console.log(
//     `Total number of bags that can hold shitty gold bag is: ${finalArrayOfBags.length}`
//   );
// });

/**
 * Part 2
 */

function findBagRules(bag, allBags) {
  for (const currentBag of allBags) {
    if (currentBag.startsWith(bag)) {
      return currentBag;
    }
  }

  return "";
}

function getNumberOfBags(arrayOfBags, allBags, currentBagCount = 0) {
  // Loop through existing bags
  if (arrayOfBags.length > 0) {
    for (const currentBag of arrayOfBags) {
      // First add current bag count to total
      const nameSplit = currentBag.split(" ");
      if (!isNaN(nameSplit[0])) {
        let num = parseInt(nameSplit[0]);
        currentBagCount += num;

        const nameToCheck = nameSplit.slice(1).join(" ");
        let getFullBagRule = findBagRules(
          nameToCheck.replace(".", ""),
          allBags
        );

        const content = getFullBagRule.split("contain")[1];
        if (content) {
          const insideBagArray = content.split(",").map((i) => i.trim());
          insideBagArray.forEach((bag) => {
            if (/\d/.test(bag)) {
              arrayOfBags.push(bag);
            }
          });
          arrayOfBags.splice(0, 1);
          if (arrayOfBags.length) {
            return getNumberOfBags(arrayOfBags, allBags, currentBagCount);
          } else {
            return currentBagCount;
          }
        }
      }
    }
  } else {
    return currentBagCount;
  }
}

function getBags(bags, hashMap, totalSum) {
  for (const bag of bags) {
    let count = bag.amount;

    if (bag) {
    } else {
      totalSum += count;
    }
  }
}

{
  if (hashMap[bag.bagName]) {
    return bagAmount * getBags(hashMap[bag.bagName]);
  } else {
    return bag.amount;
  }
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
          bagName: bagSplit.slice(1).join(" ").replace(".", "").trim(),
        });
      }
    });

    hashMap[name.trim()] = tempArr;
  }

  const target = "shiny gold bags";
  let totalSum = 0;
  const totalCount = getBags(hashMap[target], hashMap, totalSum);

  // const goldenBagRule = findBagRules(target, arrayOfInputs);
  // const content = goldenBagRule.split("contain")[1];
  // const insideBagArray = content.split(",").map((i) => i.trim());
  // const totalNumberOfBags = getNumberOfBags(insideBagArray, arrayOfInputs);
  // console.log(totalNumberOfBags);
});
