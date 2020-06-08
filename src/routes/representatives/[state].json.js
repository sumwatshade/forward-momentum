import congressData from 'congress-legislators/legislators-current.yaml';

const lookup = new Map();
congressData.forEach((legislator, index) => {
    const { id: { bioguide } } = legislator;
    const state = legislator.terms[legislator.terms.length - 1].state.toLowerCase();

    const prevLookup = lookup.get(state);
    if (!prevLookup || !Array.isArray(prevLookup)) {
        lookup.set(state, [legislator])
    } else {
        lookup.set(state, [...prevLookup, legislator]);
    }
});

export function get(req, res, next) {
    const { state } = req.params;

    const stateLookup = state.toLowerCase();
    if (lookup.has(stateLookup)) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(lookup.get(stateLookup)));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}
