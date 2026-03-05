const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remnvc')
		.setDescription('Entfernt einem Nutzer Nova-Coins (Admin only).')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dem NVC entzogen werden sollen')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('betrag')
				.setDescription('Die Anzahl der NVC')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some(role => role.id === "450742960678764544")) {
			return interaction.reply({ content: "Du hast keine Berechtigung dafür.", ephemeral: true });
		}

		const targetUser = interaction.options.getUser('user');
		const amount = interaction.options.getInteger('betrag');

		try {
			const docs = await Sale.findOne({ MemberId: targetUser.id });
			if (!docs) {
				return interaction.reply({ content: "Dieser Nutzer hat kein Profil.", ephemeral: true });
			}

			await Sale.updateOne({ _id: docs._id }, { $set: { cxc: docs.cxc - amount } });
			await interaction.reply({ content: `${amount} NVC wurden <@${targetUser.id}> abgezogen.` });

		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Fehler beim Abziehen der NVC.", ephemeral: true });
		}
	},
};
