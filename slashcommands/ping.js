const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ping meee'),
	async execute(interaction) {

		var PingEmbed = new EmbedBuilder()
		.setColor(0xe19517)
		.setTitle("Ping Embed")
		.addFields(
		{name: "Ping: " ,value:`Pong` },
		)

		await interaction.reply({embeds:[PingEmbed], ephemeral:true});
	},
};

