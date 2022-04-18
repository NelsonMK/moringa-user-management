const { UsersService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// Retrieve and return all users
exports.getUsers = catchAsync(async (req, res) => {
	const users = await UsersService.getUsers();

	res.render('index', { users });
});

// Create and save a new user
exports.createUser = catchAsync(async (req, res) => {
	const user = await UsersService.creatUser(req.body);
	res.send({ message: 'User created successfully', user });
});

// Render update user
exports.renderUpdateUser = catchAsync(async (req, res) => {
	const user = await UsersService.getUser(req.params.id);

	res.render('update-user', { user });
});

// Update a current existing user
exports.updateUser = catchAsync(async (req, res) => {
	const user = await UsersService.updateUser(req.params.id, req.body);

	res.send({ message: 'User updated successfully', user });
});

// Delete a user with specified userId in the request
exports.deleteUser = catchAsync(async (req, res) => {
	const affectedRows = await UsersService.deleteUserById(req.params.id);

	res.send({ message: 'User deleted successfully', affectedRows });
});
