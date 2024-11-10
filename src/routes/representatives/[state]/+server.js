import { json, error } from '@sveltejs/kit';
import { lookup } from '../../../utils/server/state-data';

export function GET({ params }) {
	const { state } = params;

	const stateLookup = state.toLowerCase();
	if (lookup.has(stateLookup)) {
		return json(lookup.get(stateLookup));
	} else {
		return error(404, 'Not found');
	}
}
