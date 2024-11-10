export const load = async ({ fetch, params }) => {
	const { state } = params;
	const res = await fetch(`${state.toLowerCase()}`);
	const data = await res.json();

	if (res.status === 200) {
		return {
			reps: data,
			state: state.toUpperCase()
		};
	}

	throw new Error('Failed to pull state data');
};
