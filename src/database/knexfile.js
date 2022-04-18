module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './src/database/db.sqlite3',
		},
		useNullAsDefault: true,
		debug: true,
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: './src/database/db.sqlite3',
		},
		useNullAsDefault: true,
		debug: true,
	},
};
