// caching the channel messages
const dotenv = require('dotenv');
dotenv.config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const Channel = require('../models/channels');
const Sale = require('../models/sale');

let bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
});

bot.login(process.env.TOKEN);

mongoose.connect('mongodb+srv://NY_Cookie:' + process.env.Password + '@clixoom-bot.oj9lk.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	dbName: process.env.DB,
}).then(() => {
	console.log('\nconnected to database\n');
}).catch(err => { console.error(err) });


async function lots_of_messages_getter(channel, limitt = 10000) {
	const sum_messages = [];
	let last_id;

	while (true) {
		const options = { limit: 99 };
		if (last_id) {
			options.before = last_id;
		}

		const messages = await channel.messages.fetch(options);
		if (messages.size === 0) break;
		sum_messages.push(messages.size);
		last_id = messages.last().id;

		const total_so_far = sum_messages.reduce((a, b) => a + b, 0);
		if (messages.size != 99 || total_so_far >= limitt) {
			break;
		}
	}

	return sum_messages.reduce((a, b) => a + b, 0);
}

async function countmessages(channelid) {
	try {
		let channel = await bot.channels.fetch(channelid);
		if (!channel) return 0;
		return await lots_of_messages_getter(channel);
	} catch (err) {
		console.error(`Error counting messages for ${channelid}:`, err);
		return 0;
	}
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

(async () => {
	// Wait for bot to be ready
	await new Promise(resolve => bot.once('ready', resolve));
	console.log("Bot ready for caching");

	let docs = await Sale.find();
	let filtereddocs = docs.filter(e => e.Channelid != "undefined" || e.Channelid2 != "undefined");

	for (var i = 0; i < filtereddocs.length; i++) {
		// channel 1
		if (filtereddocs[i].Channelid != "undefined") {
			let msgcount = await countmessages(filtereddocs[i].Channelid);
			let exists = await Channel.exists({ channelid: filtereddocs[i].Channelid });
			
			if (exists) {
				await Channel.updateOne({ channelid: filtereddocs[i].Channelid }, { messagecount: msgcount, lastcachedate: new Date() });
			} else {
				let Newchannel = new Channel({
					_id: new mongoose.Types.ObjectId(),
					channelid: filtereddocs[i].Channelid,
					ownerid: filtereddocs[i].MemberId,
					messagecount: msgcount,
					lastcachedate: new Date(),
				});
				await Newchannel.save();
			}
			console.log(`Updated channel 1: ${filtereddocs[i].Channelid}`);
			await sleep(5000);
		}

		// channel 2
		if (filtereddocs[i].Channelid2 != "undefined") {
			let msgcount = await countmessages(filtereddocs[i].Channelid2);
			let exists = await Channel.exists({ channelid: filtereddocs[i].Channelid2 });
			
			if (exists) {
				await Channel.updateOne({ channelid: filtereddocs[i].Channelid2 }, { messagecount: msgcount, lastcachedate: new Date() });
			} else {
				let Newchannel = new Channel({
					_id: new mongoose.Types.ObjectId(),
					channelid: filtereddocs[i].Channelid2,
					ownerid: filtereddocs[i].MemberId,
					messagecount: msgcount,
					lastcachedate: new Date(),
				});
				await Newchannel.save();
			}
			console.log(`Updated channel 2: ${filtereddocs[i].Channelid2}`);
			await sleep(5000);
		}
	}

	let channeldocs = await Channel.find();
	for (var i = 0; i < channeldocs.length; i++) {
		let found = docs.find(element => element.Channelid == channeldocs[i].channelid || element.Channelid2 == channeldocs[i].channelid);
		if (found == undefined) {
			console.log(`Deleting orphan channel record: ${channeldocs[i].channelid}`);
			await Channel.deleteOne({ _id: channeldocs[i]._id });
		}
	}

	await mongoose.disconnect();
	process.exit();
})().catch((e) => console.error(e));
