const express = require('express');
const path = require('path');
const morgan = require('morgan');
const httpStatus = require('http-status');

const router = require('./src/routes');
const connectDB = require('./src/database/connection');
const { errorConverter, errorHandler } = require('./src/middlewares/error');
const ApiError = require('./src/utils/ApiError');

// Initialize express app
const app = express();

// Initialize database connection
connectDB();

// Log requests
app.use(morgan('dev'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Define static folder location
app.use(express.static(path.join(__dirname, 'src/public')));

// Define views folder location
app.set('views', path.join(__dirname, 'src/views'));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Load routes
app.use('/', router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
	console.log(`App running on http://localhost:${PORT}`);
});
