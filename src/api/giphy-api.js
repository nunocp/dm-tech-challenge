const axios = require('axios');

const { ExternalAPIError } = require('./api-error');

class GiphyAPI {
	constructor (api_key) {
		this.api_key = api_key;

		this.api = axios.create({ baseURL: `http://api.giphy.com/v1/gifs/search` });

		/*
		Intercepts responses.
		API's specific errors can be processed here for custom/better error responses.
		*/
		this.api.interceptors.response.use (
			(res) => { return Promise.resolve ({ data: res.data }); },
			(err) => { return Promise.reject (new ExternalAPIError (`Giphy API Error: ${err.response.data.message}`, err)); }
		);
	}

	search (query) {
		return this.api.get('', {
			params: {
				q: query,
				api_key: this.api_key,
				limit: 5,
				rating: 'g',
			}
		});
	}
}

module.exports = { GiphyAPI };