const colorRep = 'rgba(178,34,52,1)';
const colorDem = 'rgba(60,59,110,1)';
const colorLib = 'rgba(176,118,0,1)';
const colorInd = 'rgba(128,0,128,1)';

function getRatio(val, total) {
  return parseInt((100.0 * val) / total, 10);
}

/**
 *
 * @param {*} stateData - number of reps from each party
 */
export default function getRepGradientRule({
  numRep,
  numDem,
  numLib,
  numInd,
}) {
  const total = numRep + numDem + numLib + numInd;
  //   const gradientAngle = parseInt(Math.random() * 360, 10);

  const stringSet = [];

  [
    {
      val: numRep,
      color: colorRep,
    },
    {
      val: numDem,
      color: colorDem,
    },
    {
      val: numLib,
      color: colorLib,
    },
    {
      val: numInd,
      color: colorInd,
    },

  ].filter(({ val }) => val > 0).map((n) => ({
    val: getRatio(n.val, total),
    color: n.color,
  }))
    .reduce((currentPercentage, { color, val }) => {
      stringSet.push(`${color} ${currentPercentage}%`);
      stringSet.push(`${color} ${currentPercentage}%`);

      return currentPercentage + val;
    }, 0.0);


  return `linear-gradient(315deg, ${stringSet.join(',')})`;
}
