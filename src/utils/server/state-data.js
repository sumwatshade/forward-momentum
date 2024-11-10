import congressData from '../../lib/data/legislators-current.yaml';
import socialData from '../../lib/data/legislators-social-media.yaml';

const socialLookup = socialData.reduce((acc, nextSocial) => {
	acc.set(nextSocial.id.bioguide, nextSocial.social);
	return acc;
}, new Map());

export const lookup = new Map();
congressData.forEach((legislator) => {
	const curr = { ...legislator };
	const {
		id: { bioguide }
	} = curr;

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

export const states = Array.from(lookup.keys())
	.sort((a, b) => {
		if (a === b) {
			return 0;
		}
		return a > b ? 1 : -1;
	})
	.map((state) => {
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
			numInd
		};
	});
