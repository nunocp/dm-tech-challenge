/**
 * @jest-environment node
 */

const axios = require('axios');

require('../src/config');
const server = require('../src/server');
const port = process.env.SERVER_PORT || 4000;

function startServer () {
	return new Promise ((resolve, reject) => {
		server.listen(port, () => {
			resolve();
		});
	});
}

beforeAll(async () => {
	await startServer();
});

// === TESTS ===

test(`Get recipes with onion and garlic`, async () => {
	var	res = await axios.get(`http://localhost:${port}/recipes/?i=onion,garlic`);
	expect(res.data.recipes).toBeDefined();
});

test(`Endpoint should silently accepts 3 ingredients maximum`, async () => {
	var	res = await axios.get(`http://localhost:${port}/recipes/?i=onion,garlic,tomato,bread`);
	expect(res.data.keywords.length).toBeLessThanOrEqual(3);
});