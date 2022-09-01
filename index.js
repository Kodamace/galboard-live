let buckets = Array.from({ length: 10 }, () => 0);
// const initialProbabilityMap = [2, 6, 10, 14, 18, 18, 14, 10, 6, 2];
// let start = 4;
// const newProbabilityMap = initialProbabilityMap.map((_p, index) => {
//   if (index === start) {
//     return 25;
//   }

//   let distanceFromStart = index - start;

//   if (distanceFromStart < 0) {
//     distanceFromStart = -distanceFromStart;
//   }

//   return 25 - distanceFromStart * 2;
// });

// const getBucketResult = (buckets, weights) => {
//   const weightsSum = weights.reduce((a, b) => a + b, 0);
//   const random = Math.random() * weightsSum;

//   let sum = 0;

//   let result = 0;

//   for (let i = 0; i < buckets.length; i += 1) {
//     sum += weights[i];

//     if (random <= sum) {
//       result = i;

//       break;
//     }

//     if (i === buckets.length - 1) {
//       result = i;
//     }
//   }

//   return result;
// };

// const result = getBucketResult(buckets, newProbabilityMap);

// console.log({ result, newProbabilityMap });
const start = 3;
const getGaltonBoardProbabilityWeights = (buckets) => {
  const end = 20 - 1;
  const center = end / 2;
  const probabilityMap = [];
  for (let i = 0; i < 20; i++) {
    if (i === 0 || i === end) {
      probabilityMap.push(1);
    } else {
      if (i < center || i < center - 1) {
        const pLeft = i;
        probabilityMap.push(pLeft * 2);
      }
      if (i > center || i === center) {
        const pRight = end - i;
        probabilityMap.push(pRight * 2);
      }
    }
  }

  return probabilityMap;
};

const probabilityOutcome = getGaltonBoardProbabilityWeights(buckets);

console.log(probabilityOutcome);
