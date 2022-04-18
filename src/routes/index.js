const express = require('express');

const { UsersController } = require('../controllers');
const validate = require('../middlewares/validate');
const { UsersValidation } = require('../validations');

const router = express.Router();

/**
 * @description Root Route
 * @method GET /
 */
router.get('/', UsersController.getUsers);

/**
 * @description add users
 * @method GET /add-user
 */
router.get('/add-user', (req, res) => {
	res.render('add-user');
});

/**
 * @description update users
 * @method GET /update-suer
 */
router.get('/update-user/:id', UsersController.renderUpdateUser);

// API
router
	.get('/api/users', UsersController.getUsers)
	.post(
		'/api/users',
		validate(UsersValidation.createUser),
		UsersController.createUser
	)
	.put(
		'/api/users/:id',
		validate(UsersValidation.updateUser),
		UsersController.updateUser
	)
	.delete('/api/users/:id', UsersController.deleteUser);

module.exports = router;
