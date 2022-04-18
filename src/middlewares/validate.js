const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const validate = (schema) => async (req, res, next) => {
	try {
		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params,
			headers: req.headers,
		});

		return next();
	} catch (error) {
		return next(new ApiError(httpStatus.BAD_REQUEST, error.message));
	}
};

module.exports = validate;
