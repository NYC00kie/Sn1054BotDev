const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nvctop')
		.setDescription('Zeigt dir die Top10 der Leute mit den meisten NVC an.'),
	async execute(interaction) {
		try {
			const docs = await Sale.find().exec();
			const topDocs = docs.sort((a, b) => b.cxc - a.cxc).slice(0, 10);

			const TopEmbed = new EmbedBuilder()
				.setColor(0xe19517)
				.setTitle("Die 10 Leute mit den meisten Nova-Coins")
				.setFooter({ text: "Heute ist der: " + new Date().toLocaleDateString() });

			let description = "";
			topDocs.forEach((doc, i) => {
				description += `${i + 1}. ${doc.Nickname || doc.Name} mit **${doc.cxc}** NVC\n`;
			});

			TopEmbed.setDescription(description || "Keine Daten gefunden.");

			await interaction.reply({ embeds: [TopEmbed], ephemeral: true });
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Fehler beim Abrufen der Top-Liste.", ephemeral: true });
		}
	},
};
