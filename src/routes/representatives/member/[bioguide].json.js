import congressData from "congress-legislators/legislators-current.yaml";

const lookup = new Map();
congressData.forEach((legislator) => {
  const curr = {...legislator};
  const {
    id: { bioguide },
  } = curr;
  curr.term = curr.terms[curr.terms.length - 1];
  delete curr.terms;

  lookup.set(bioguide, curr);
});

export const states = Array.from(lookup.keys()).sort((a, b) => {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
});

export function get(req, res, next) {
  const { bioguide } = req.params;

  if (lookup.has(bioguide)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(lookup.get(bioguide)));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
