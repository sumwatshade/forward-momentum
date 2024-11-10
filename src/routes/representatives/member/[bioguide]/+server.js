import { json, error } from '@sveltejs/kit';
import congressData from '$lib/data/legislators-current.yaml';

const lookup = new Map();
congressData.forEach((legislator) => {
	const curr = { ...legislator };
	const {
		id: { bioguide }
	} = curr;
	curr.term = curr.terms[curr.terms.length - 1];
	delete curr.terms;

	lookup.set(bioguide, curr);
});

export function GET({ params }) {
	const { bioguide } = params;

	if (lookup.has(bioguide)) {
		return json(lookup.get(bioguide));
	} else {
		return error(404, 'Not found');
	}
}
