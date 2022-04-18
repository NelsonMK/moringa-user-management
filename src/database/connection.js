const knex = require('knex');
const { Model } = require('objection');

const knexfile = require('./knexfile');

const connectDB = async () => {
	try {
		let db;
		if (process.env.NODE_ENV === 'development') {
			db = await knex(knexfile.development);
		} else {
			db = await knex(knexfile.production);
		}

		Model.knex(db);

		console.log('Database connection successful');

		// Check the pre existing db schema and update it
		initializeDb(db);
	} catch (error) {
		console.log('Unable to connect to the db due to: ', error);
	}
};

function initializeDb(db) {
	db.schema.hasTable('users').then((exists) => {
		if (!exists) {
			return db.schema
				.createTable('users', (table) => {
					table.increments('id').primary();
					table.string('name').notNullable();
					table.string('email').unique().notNullable();
					table.string('gender');
					table.string('status');
					table.timestamps(true);
				})
				.then(() => {
					console.log('Users table created successfully');
				})
				.catch((error) => {
					console.log('Unable to create users table due to', error);
				});
		}
	});
}

module.exports = connectDB;
