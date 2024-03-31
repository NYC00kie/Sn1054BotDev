const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ping meee'),
	async execute(interaction) {

		await interaction.reply({content:`XMR: 82jEH9rqCo88nDDE3ybmpfZacjtYPH99AD9ES6txNn714SbWG2izuzKi1JWY5ea8Ea7ERiroHUXULWFG41PXPPe36kN6FKc`,ephemeral:true});
	},
};
