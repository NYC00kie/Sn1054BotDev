const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const ChannelModel = require('../models/channels');
const moment = require("moment");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chstats')
		.setDescription('Zeigt dir Statistiken zu deinem Kanal oder dem eines anderen Nutzers an.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dessen Kanal-Stats du sehen möchtest')),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('user') || interaction.user;

		ChannelModel.findOne({ ownerid: targetUser.id })
			.exec()
			.then(docs => {
				if (!docs) {
					return interaction.reply({ content: 'Dieser Nutzer hat keinen Kanal in der Datenbank registriert.', ephemeral: true });
				}

				const chstatsEmbed = new EmbedBuilder()
					.setColor(0xe19517)
					.setTitle(`${targetUser.username}'s Kanal-Stats`)
					.addFields(
						{ name: "Stats:", value: `Dein Channel:\n<#${docs.channelid}>\n\nNachrichten:\n${docs.messagecount}\n\nvorrausgesehene Nvc:\n${docs.messagecount * 12}\n(stand : ${moment(docs.lastcachedate).format('DD MMMM YYYY, HH:mm')})` }
					)
					.setTimestamp();

				interaction.reply({ embeds: [chstatsEmbed] });
			})
			.catch(err => {
				console.error(err);
				interaction.reply({ content: 'Fehler beim Abrufen der Kanal-Statistiken.', ephemeral: true });
			});
	},
};
