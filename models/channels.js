const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	channelid: { type: String, required: true },
	ownerid: { type: String, required: true },
	messagecount: { type: Number, required: true },
	lastcachedate: { type: Date, required: true },
})

module.exports = mongoose.model('Channel', channelSchema);