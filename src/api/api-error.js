class ExternalAPIError {
	constructor (message, axiosError) {
		try {
			this.error = {
				code: axiosError.response.status,
				message: message,
				error: axiosError.message
			};
		} catch (err) {
			this.error = {
				code: null,
				message: message,
				error: ''
			};
		}
	}
}

module.exports = { ExternalAPIError };