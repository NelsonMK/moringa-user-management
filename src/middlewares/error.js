const httpStatus = require('http-status');
const { DBError } = require('objection');

const ApiError = require('../utils/ApiError');

exports.errorConverter = (err, req, res, next) => {
	let error = err;

	if (!error instanceof ApiError) {
		const statusCode =
			error.statusCode || error instanceof DBError
				? httpStatus.BAD_REQUEST
				: httpStatus.INTERNAL_SERVER_ERROR;

		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}

	return next(error);
};

exports.errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;
	if (process.env.NODE_ENV === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		error: true,
		message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
	};

	if (process.env.NODE_ENV === 'development' || 'production') {
		console.log(err);
	}

	res.status(statusCode).send(response);
};
