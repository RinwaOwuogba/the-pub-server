const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const requiredString = {
	type: String,
	required: true,
};

const participantSchema = {
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	alias: requiredString,
};

const messageSchema = {
	sender: requiredString,
	time: {
		required: true,
		type: Date,
		default: Date.now,
	},
	content: requiredString,
};

const chatSchema = new Schema(
	{
		participants: [participantSchema],
		messages: [messageSchema],
	},
	{
		timestamps: true,
	}
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;
