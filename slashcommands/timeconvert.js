const momenttz = require("moment-timezone");
const Discord = require('discord.js');
let SlashCommandBuilder = Discord.SlashCommandBuilder

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
