const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
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
		.setName('delete')
		.setDescription('Lösche (archiviere) deinen eigenen Kanal.')
		.addChannelOption(option =>
			option.setName('kanal')
				.setDescription('Der Kanal, den du löschen möchtest (erforderlich, wenn du 2 hast)')),
	async execute(interaction) {
		const memberId = interaction.user.id;
		const docs = await Sale.findOne({ MemberId: memberId });

		if (!docs) {
			return interaction.reply({ content: 'Du hast noch kein Profil.', ephemeral: true });
		}

		let channelToDeleteId;
		let isChannel2 = false;

		const hasCh1 = docs.Channelid !== "undefined";
		const hasCh2 = docs.Channelid2 !== "undefined";

		if (!hasCh1 && !hasCh2) {
			return interaction.reply({ content: "Du hast keinen Kanal!", ephemeral: true });
		}

		const selectedChannel = interaction.options.getChannel('kanal');

		if (hasCh1 && hasCh2) {
			if (!selectedChannel) {
				return interaction.reply({ content: `Da du zwei Kanäle hast, musst du angeben, welchen du löschen möchtest: <#${docs.Channelid}> oder <#${docs.Channelid2}>`, ephemeral: true });
			}
			if (selectedChannel.id === docs.Channelid) {
				channelToDeleteId = docs.Channelid;
				isChannel2 = false;
			} else if (selectedChannel.id === docs.Channelid2) {
				channelToDeleteId = docs.Channelid2;
				isChannel2 = true;
			} else {
				return interaction.reply({ content: "Dieser Kanal gehört dir nicht!", ephemeral: true });
			}
		} else {
			if (hasCh1) {
				channelToDeleteId = docs.Channelid;
				isChannel2 = false;
			} else {
				channelToDeleteId = docs.Channelid2;
				isChannel2 = true;
			}
			if (selectedChannel && selectedChannel.id !== channelToDeleteId) {
				return interaction.reply({ content: "Dieser Kanal gehört dir nicht!", ephemeral: true });
			}
		}

		const createdDate = isChannel2 ? docs.createdDate2 : docs.createdDate;
		const today = new Date();
		const minAge = new Date(createdDate);
		minAge.setDate(minAge.getDate() + 1);

		if (minAge > today) {
			return interaction.reply({ content: "Dein Kanal wurde vor weniger als 24h erstellt. Bitte warte mindestens 24h, bevor du ihn löschst.", ephemeral: true });
		}

		await interaction.deferReply();

		try {
			const channel = await interaction.guild.channels.fetch(channelToDeleteId);
			await channel.setParent("518452814691827731", { lockPermissions: true });
			await channel.send("Channel archived");

			const msgCount = await lots_of_messages_getter(channel);
			const reward = msgCount * 12;

			const update = isChannel2 
				? { $set: { Channelid2: "undefined", cxc: docs.cxc + reward } }
				: { $set: { Channelid: "undefined", cxc: docs.cxc + reward } };

			await Sale.updateOne({ _id: docs._id }, update);

			Loghandler.log(interaction, interaction.user, undefined, "channeldelete", undefined, channelToDeleteId);

			const delEmbed = new EmbedBuilder()
				.setColor(0xe19517)
				.setTitle("Channel Entfernungs Info")
				.addFields(
					{ name: "Channel Statistiken", value: `Dein Channel ${channel.name} wurde archiviert.\nNachrichtenanzahl: ${msgCount}\nNVC Ertrag: ${reward}` }
				);

			await interaction.editReply({ embeds: [delEmbed] });

		} catch (err) {
			console.error(err);
			await interaction.editReply({ content: "Ein Fehler ist beim Löschen des Kanals aufgetreten." });
		}
	},
};
