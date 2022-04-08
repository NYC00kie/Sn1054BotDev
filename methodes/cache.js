// caching the channel messages
const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const mongoose = require('mongoose');
const Channel = require('../models/channels')
const Sale = require('../models/sale');

let bot = new Discord.Client({
	ws: {
		intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES"]
	}
});

bot.login(process.env.TOKEN);

mongoose.connect('mongodb+srv://NY_Cookie:' + process.env.Password + '@clixoom-bot-oj9lk.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	dbName: process.env.DB,
}).then(() => {
	console.log('\nconnected to database\n')
}).catch(err => { console.error(err) })


async function lots_of_messages_getter(channel, limitt = 10000) {

	const sum_messages = [];
	let last_id;

	while (true) {
		const options = {
			limit: 99
		};
		if (last_id) {
			options.before = last_id;
		}

		const messages = await channel.messages.fetch(options);
		sum_messages.push(messages.size);
		last_id = messages.last().id;

		if (messages.size != 99 || sum_messages >= limitt) {
			break;
		}
	}

	return sum_messages;
}

async function how_many_messages_are_there_actually(msgcount) {
	let PreActuall_messages_v0 = msgcount.toString();
	let Actuall_messages_v0 = PreActuall_messages_v0.split(",");
	let y = Actuall_messages_v0.length

	var count = 0
	for (i = 0; i < y; i++) {
		var count = count + parseInt(Actuall_messages_v0[i])
	}
	actuall_messages = count
	return actuall_messages
}

async function countmessages(channelid) {

	let channel = await bot.channels.cache.get(channelid)

	let msgcount1 = await lots_of_messages_getter(channel)
	let msgcount2 = await how_many_messages_are_there_actually(msgcount1)

	return msgcount2
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

(async () => {

	let docs = await Sale.find()
	let filtereddocs = docs.filter(e => e.Channelid != "undefined" || e.Channelid2 != "undefined")

	console.log(filtereddocs)

	// check if the channel already exists
	for (var i = 0; i < filtereddocs.length; i++) {
		filtereddocs[i].created = await Channel.exists({ channelid: filtereddocs[i].Channelid }) || await Channel.exists({ channelid: filtereddocs[i].Channelid2 })
	}
	await sleep(5000)
	for (var i = 0; i < filtereddocs.length; i++) {

		// channel 1
		if (filtereddocs[i].Channelid != "undefined") {
			let msgcount = await countmessages(filtereddocs[i].Channelid)
			if (filtereddocs[i].created) {
				let channeldoc = await Channel.findOne({ channelid: filtereddocs[i].Channelid })
				let update = { messagecount: msgcount, lastcachedate: new Date() }
				await channeldoc.updateOne(update)
			} else {
				let Newchannel = new Channel({
					_id: new mongoose.Types.ObjectId(),
					channelid: filtereddocs[i].Channelid,
					ownerid: filtereddocs[i].MemberId,
					messagecount: msgcount,
					lastcachedate: new Date(),
				})
				await Newchannel.save()
			}
			let waittimems = 60000 * (Math.floor(msgcount / 1000) + 1)
			console.log(`${waittimems/60000} Minuten`)
			await sleep(waittimems)
		}

		// channel 2
		if (filtereddocs[i].Channelid2 != "undefined") {
			let msgcount = await countmessages(filtereddocs[i].Channelid2)
			if (filtereddocs[i].created) {
				let channeldoc = await Channel.findOne({ channelid: filtereddocs[i].Channelid2 })
				let update = { messagecount: msgcount, lastcachedate: new Date() }
				await channeldoc.updateOne(update)
			} else {
				let Newchannel = new Channel({
					_id: new mongoose.Types.ObjectId(),
					channelid: filtereddocs[i].Channelid2,
					ownerid: filtereddocs[i].MemberId,
					messagecount: msgcount,
					lastcachedate: new Date(),
				})
				await Newchannel.save()
			}
			let waittimems = 60000 * (Math.floor(msgcount / 1000) + 1)
			console.log(`${waittimems/60000} Minuten`)
			await sleep(waittimems)
		}

	}

	let channeldocs = await Channel.find()

	for (var i = 0; i < channeldocs.length; i++) {

		let found = docs.find(element => element.Channelid == channeldocs[i].channelid || element.Channelid2 == channeldocs[i].channelid)
		// wenn der channel gelöscht wurde, lösche ihn auch aus der Sammlung
		if (found == undefined) {
			console.log("no Partner found")
			console.log(channeldocs[i])
			await channeldocs[i].remove()
		}
	}

	await mongoose.disconnect();
	await mongoose.connection.close()
	process.exit()
})().catch((e) => console.error(e))