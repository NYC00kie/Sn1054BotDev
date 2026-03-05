const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlink')
		.setDescription('Entfernt die Verknüpfung des Kanals eines Nutzers (Admin only).')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dessen Kanal entlinkt werden soll')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some(role => role.id === "450742960678764544")) {
			return interaction.reply({ content: "Du hast keine Berechtigung dafür.", ephemeral: true });
		}

		const targetUser = interaction.options.getUser('user');

		try {
			const docs = await Sale.findOne({ MemberId: targetUser.id });
			if (!docs) {
				return interaction.reply({ content: "Dieser Nutzer hat kein Profil.", ephemeral: true });
			}

			if (docs.Channelid === "undefined") {
				return interaction.reply({ content: "Dieser Nutzer hat keinen verknüpften Kanal.", ephemeral: true });
			}

			const channelId = docs.Channelid;
			const channel = await interaction.guild.channels.fetch(channelId);
			if (channel) {
				await channel.send(`Dieser Channel wurde entlinkt. Der User: <@${targetUser.id}> erhält nun keine cxc mehr für diesen Channel.`);
			}

			await Sale.updateOne({ _id: docs._id }, { $set: { Channelid: "undefined" } });

			// Log to a specific channel if needed as in original code
			const logChannel = interaction.client.channels.cache.get("509757254862372883");
			if (logChannel) {
				await logChannel.send(`channel von <@${targetUser.id}> wurde entlinkt \n unlink`);
			}

			await interaction.reply({ content: `Kanal von <@${targetUser.id}> wurde erfolgreich entlinkt.`, ephemeral: true });

		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Ein Fehler ist beim Entlinken aufgetreten.", ephemeral: true });
		}
	},
};
