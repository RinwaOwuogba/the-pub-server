const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const requiredString = {
	type: String,
	required: true,
};

const requiredUniqueString = {
	type: String,
	required: true,
	unique: true,
};

const userSchema = new Schema(
	{
		username: requiredUniqueString,
		email: requiredUniqueString,
		hash: requiredString,
	},
	{
		timestamps: true,
	}
);

const User = model('User', userSchema);

module.exports = User;
