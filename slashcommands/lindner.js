const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lindner')
		.setDescription('Christian Lindner Haha Nein.'),
	async execute(interaction) {
		await interaction.reply({
			files: ["./slashcommands/cxgifs/Christian_Lindner_Haha_Nein-480p.mp4"]
		});
	},
};
