const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Channel = require('../models/channels');
const moment = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chtop')
		.setDescription('Zeigt dir die Top10 der Leute mit den best laufenden Channel(s) an.'),
	async execute(interaction) {
		try {
			const docs = await Channel.find().exec();
			const channelarr = docs.sort((a, b) => b.messagecount - a.messagecount).slice(0, 10);

			const TopEmbed = new EmbedBuilder()
				.setColor(0xe19517)
				.setTitle("Die (bis zu) 10 Leute mit den best laufenden Channel(s)")
				.setFooter({ text: "Heute ist der: " + new Date().toLocaleDateString() });

			let description = "";
			for (var i = 0; i < channelarr.length; i++) {
				const timeStr = moment(channelarr[i].lastcachedate).format('DD MMMM YYYY, HH:mm');
				description += `${i + 1}. <#${channelarr[i].channelid}> von <@${channelarr[i].ownerid}> mit ${channelarr[i].messagecount} Nachrichten. \n( Stand ${timeStr} )\n\n`;
			}

			if (description) {
				TopEmbed.setDescription(description);
			} else {
				TopEmbed.setDescription("Keine Kanäle gefunden.");
			}

			await interaction.reply({ embeds: [TopEmbed] });
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Fehler beim Abrufen der Top-Liste.", ephemeral: true });
		}
	},
};
