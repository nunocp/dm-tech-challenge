const axios = require('axios');

const { ExternalAPIError } = require('./api-error');

class RecipePuppyAPI {
	constructor () {
		this.api = axios.create({ baseURL: `http://www.recipepuppy.com/api/` });

		/*
		Intercepts responses.
		API's specific errors can be processed here for custom/better error responses.
		*/
		this.api.interceptors.response.use (
			(res) => { return Promise.resolve ({ data: res.data }); },
			(err) => { return Promise.reject (new ExternalAPIError ("Recipe Puppy API Error", err)); }
		);
	}

	searchByIngredients (ingredients) {
		// Ex: ?i=onions,garlic
		return this.api.get('', {
			params: {
				i: ingredients.join(','),
			}
		});
	}
}

module.exports = { RecipePuppyAPI };