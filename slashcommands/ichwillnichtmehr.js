const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ichwillnichtmehr')
		.setDescription('Ich will nicht mehr.'),
	async execute(interaction) {
		await interaction.reply({
			files: ["./slashcommands/cxgifs/Ichwillnichtmehr.mp4"]
		});
	},
};
