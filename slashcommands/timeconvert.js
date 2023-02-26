const moment = require("moment-timezone");
const Discord = require('discord.js');
const { Temporal } = require('@js-temporal/polyfill');
let SlashCommandBuilder = Discord.SlashCommandBuilder

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeconvert')
		.setDescription('Wandelt die Uhrzeit mit einer Zeitzone in jede mögliche Zeitzone um!')
		.addIntegerOption(option => 
			option.setName('stunde')
				.setDescription("Die Stundenzahl der Uhrzeit, in der anderen Zeitzone")
				.setRequired(true)
			)
		.addIntegerOption(option => 
			option.setName('minute')
				.setDescription("Die Minutenzahl der Uhrzeit, in der anderen Zeitzone")
				.setRequired(true)
			)
		.addStringOption(option => 
			option.setName('zeitzone')
				.setDescription("Die Zeitzone, aus der die Zeit kommt ( Europe/Paris, Europe/Berlin, ...)")
				.setRequired(true)
			),
	async execute(interaction) {
		try{
		const Stunde = interaction.options.getInteger('stunde')
		const Minute = interaction.options.getInteger('minute')
		const zeitzone = interaction.options.getString('zeitzone')
		const datum = new Date()
		const timeObject = {day : datum.getUTCDate(), month:datum.getUTCMonth() + 1, year:datum.getUTCFullYear() , hour: Stunde, minute: Minute, timeZone: zeitzone }
		const date = Temporal.ZonedDateTime.from(timeObject).toInstant().toString();
		await interaction.reply({content:`${date} UTC+00:00`,ephemeral:false});
		}
		catch {
			await interaction.reply({content:`Etwas ist schief gelaufen. überprüfe die Zeitzone bitte erneut`,ephemeral:true});
		}
	},
};

