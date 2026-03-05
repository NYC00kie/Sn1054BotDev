const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inversesquarelaw')
		.setDescription('Inverse Square Law Video.'),
	async execute(interaction) {
		await interaction.reply({
			files: ["./slashcommands/cxgifs/InverseSquarelaw_Michealreeves.mp4"]
		});
	},
};
