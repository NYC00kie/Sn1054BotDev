const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nvc')
		.setDescription('Zeigt dir deine Nova-Coins oder die eines anderen Nutzers an.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dessen NVC du sehen möchtest')),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('user') || interaction.user;

		Sale.findOne({ MemberId: targetUser.id })
			.exec()
			.then(docs => {
				if (!docs) {
					return interaction.reply({ content: 'Dieser Nutzer hat noch kein Profil.', ephemeral: true });
				}
				interaction.reply(`${docs.Nickname} hat aktuell **${docs.cxc}** Nova-Coins`);
			})
			.catch(err => {
				console.error(err);
				interaction.reply({ content: 'Fehler beim Abrufen der NVC.', ephemeral: true });
			});
	},
};
