const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');
const Loghandler = require('../methodes/Loghandler');

async function lots_of_messages_getter(channel, limitt = 10000) {
	const sum_messages = [];
	let last_id;

	while (true) {
		const options = { limit: 99 };
		if (last_id) options.before = last_id;

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archiv')
		.setDescription('Archiviert einen Kanal und gibt dem Besitzer die NVC (Admin only).')
		.addChannelOption(option =>
			option.setName('kanal')
				.setDescription('Der zu archivierende Kanal')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some(role => role.id === "450742960678764544")) {
			return interaction.reply({ content: "Du hast keine Berechtigung dafür.", ephemeral: true });
		}

		const targetChannel = interaction.options.getChannel('kanal');
		const channelId = targetChannel.id;

		try {
			let docs = await Sale.findOne({ Channelid: channelId }).exec();
			let isChannel2 = false;
			if (!docs) {
				docs = await Sale.findOne({ Channelid2: channelId }).exec();
				isChannel2 = true;
			}

			if (!docs) {
				return interaction.reply({ content: "Dieser Kanal ist in der Datenbank keinem Nutzer zugeordnet.", ephemeral: true });
			}

			await interaction.deferReply({ ephemeral: true });

			const channelObj = await interaction.guild.channels.fetch(channelId);
			await channelObj.setParent("518452814691827731");
			await channelObj.send(`Channel : ${channelId} archived`);
			await channelObj.lockPermissions();

			const msgCount = await lots_of_messages_getter(channelObj);
			const reward = msgCount * 12;

			const update = isChannel2 
				? { $set: { Channelid2: "undefined", cxc: docs.cxc + reward } }
				: { $set: { Channelid: "undefined", cxc: docs.cxc + reward } };

			await Sale.updateOne({ _id: docs._id }, update).exec();

			Loghandler.log(interaction, targetChannel, undefined, "channelarchiv", undefined, channelId);
			await interaction.editReply({ content: `Kanal <#${channelId}> wurde erfolgreich archiviert. Besitzer <@${docs.MemberId}> hat ${reward} NVC erhalten.` });

		} catch (err) {
			console.error(err);
			if (interaction.deferred) {
				await interaction.editReply({ content: "Ein Fehler ist beim Archivieren aufgetreten." });
			} else {
				await interaction.reply({ content: "Ein Fehler ist beim Archivieren aufgetreten.", ephemeral: true });
			}
		}
	},
};
