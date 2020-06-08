import congressData from 'congress-legislators/legislators-social-media.yaml';

const lookup = new Map();
congressData.forEach((legislator) => {
    lookup.set(legislator.id.bioguide, legislator.social);
});

export function get(req, res, next) {
    const { bioguide } = req.params;

    if (lookup.has(bioguide)) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(lookup.get(bioguide)));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}
