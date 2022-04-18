const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { Users } = require('../models');

/**
 * Get all users
 * @returns {Promise<Users[]>}
 */

exports.getUsers = async () => {
	return await Users.query();
};

/**
 * Create a new user
 * @param data
 * @returns {Promise<User>}
 */
exports.creatUser = async (data) => {
	const isEmailTaken = await Users.query().findOne({ email: data.email });

	if (isEmailTaken) {
		throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
	}

	const savedUser = await Users.query().insertAndFetch({ ...data });

	return savedUser;
};

/**
 * Get a specific user using their id
 * @param id
 * @returns {Promise<Users>}
 */
exports.getUser = async (id) => {
	return await Users.query().findById(id);
};

/**
 * Update user by id
 * @param userId
 * @param updateBody
 * @returns {Promise<User>}
 */
exports.updateUser = async (userId, updateBody) => {
	const user = await this.getUser(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}

	const isEmailTaken = await Users.query()
		.findOne({ email: updateBody.email })
		.whereNot('id', userId);

	if (isEmailTaken) {
		throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
	}

	// Delete the id from update body because it does not
	// need to be updated
	delete updateBody.id;
	return await user.$query().patchAndFetch({ ...updateBody });
};

/**
 * Delete user by id
 * @param userId
 * @returns {Promise<Number>}
 */
exports.deleteUserById = async (userId) => {
	const user = await this.getUser(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}

	const affected = await user.$query().delete();
	return affected;
};
