const { Model } = require('objection');

class Users extends Model {
	static get tableName() {
		return 'users';
	}

	$beforeInsert() {
		this.created_at = new Date().toString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toString();
	}
}

module.exports = Users;
