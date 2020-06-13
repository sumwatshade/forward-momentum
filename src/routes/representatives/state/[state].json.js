import congressData from 'congress-legislators/legislators-current.yaml';
import socialData from 'congress-legislators/legislators-social-media.yaml';

const socialLookup = new Map();
socialData.forEach((social) => {
  socialLookup.set(social.id.bioguide, social.social);
});

const lookup = new Map();
congressData.forEach((legislator) => {
  const curr = { ...legislator };
  const { id: { bioguide } } = curr;

  curr.term = curr.terms[curr.terms.length - 1];
  curr.social = socialLookup.get(bioguide);
  delete curr.terms;

  const state = curr.term.state.toLowerCase();


  const prevLookup = lookup.get(state);
  if (!prevLookup || !Array.isArray(prevLookup)) {
    lookup.set(state, [curr]);
  } else {
    lookup.set(state, [...prevLookup, curr]);
  }
});

export const states = Array.from(lookup.keys()).sort((a, b) => {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
}).map((state) => {
  const reps = lookup.get(state);
  let numDem = 0;
  let numLib = 0;
  let numInd = 0;
  let numRep = 0;
  reps.forEach((r) => {
    switch (r.term.party) {
      case 'Democrat': {
        numDem += 1;
        break;
      }
      case 'Republican': {
        numRep += 1;
        break;
      }
      case 'Libertarian': {
        numLib += 1;
        break;
      }
      case 'Independent': {
        numInd += 1;
        break;
      }
      default: {
        throw new Error(`Unhandled party: ${r.term.party}`);
      }
    }
  });

  return {
    id: state,
    numDem,
    numRep,
    numLib,
    numInd,
  };
});

export function get(req, res) {
  const { state } = req.params;

  const stateLookup = state.toLowerCase();
  if (lookup.has(stateLookup)) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(lookup.get(stateLookup)));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      message: 'Not found',
    }));
  }
}
