const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');
const Loghandler = require('../methodes/Loghandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Übertrage Nova-Coins an einen anderen Nutzer.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Empfänger der NVC')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('betrag')
				.setDescription('Die Anzahl der NVC, die übertragen werden sollen')
				.setRequired(true)),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		const amount = interaction.options.getInteger('betrag');

		if (amount < 10) {
			return interaction.reply({ content: 'Der Übertragungsbetrag muss mindestens 10 NVC betragen.', ephemeral: true });
		}

		if (targetUser.id === interaction.user.id) {
			return interaction.reply({ content: 'Du kannst dir selbst keine NVC übertragen.', ephemeral: true });
		}

		try {
			const senderDocs = await Sale.findOne({ MemberId: interaction.user.id }).exec();
			if (!senderDocs) {
				return interaction.reply({ content: 'Du hast noch kein Profil.', ephemeral: true });
			}

			if (amount > senderDocs.cxc) {
				return interaction.reply({ content: 'Du hast nicht genug Nova-Coins.', ephemeral: true });
			}

			const receiverDocs = await Sale.findOne({ MemberId: targetUser.id }).exec();
			if (!receiverDocs) {
				return interaction.reply({ content: 'Der Empfänger hat noch kein Profil.', ephemeral: true });
			}

			await Sale.updateOne({ _id: senderDocs._id }, { $set: { cxc: senderDocs.cxc - amount } }).exec();
			await Sale.updateOne({ _id: receiverDocs._id }, { $set: { cxc: receiverDocs.cxc + amount } }).exec();

			Loghandler.log(interaction, interaction.user, targetUser, "transfer", undefined, undefined);
			await interaction.reply({ content: `${amount} NVC wurden erfolgreich an <@${targetUser.id}> übertragen.` });
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: 'Ein Fehler ist bei der Übertragung aufgetreten.', ephemeral: true });
		}
	},
};
