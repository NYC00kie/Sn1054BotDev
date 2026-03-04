const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const request = require('request');

module.exports = {
	cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('faktcheck')
		.addStringOption(option =>
			option
				.setName('suche')
				.setDescription('Der Suchbegriff zur Suche')
				.setMaxLength(100))
		.setDescription('Ein Fakten Check, der die ersten paar Zeilen Wikipedias ausgibt'),
		async execute(interaction) {
			const inputstring = interaction.options.getString('suche')

			var query = inputstring
			if (!query) {
				interaction.reply({content:"Dein Suchbegriff ist zu uneindeutig",ephemeral:true})
				return;
			}
			let Suche = encodeURIComponent(query)

			var url = "https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=" + Suche + "&indexpageids"; //Der Link für den Zugriff auf die Wikipedia Api

			request(url, (err, response, body) => {
				if (err) {
					var error = "cannot connect to the server";
					console.log(error);
				} else {
					var wiki = JSON.parse(body);
					let Pageid0 = wiki.query.pageids
					let Pageid1 = Pageid0[0]
					let Pages = wiki.query.pages
					let Pagecontent = Pages[Pageid1].extract
					if (!Pagecontent) {
						interaction.reply({content:"Es scheint so, als hätte deine Suche (" + query + ") kein Ergebniss. \nVersuche es sonst nocheinmal mit dem Wort im Singular. \nEs könnte außerdem sein, dass du dich verschrieben hast.",ephemeral:false})
						return;
					}

					let zeroth = Pagecontent.split("\n")
					let actuallength = Pagecontent.split("")
					let shorter = zeroth[0].substr(0, 1800)

					if (actuallength.length >= 1800) {
						interaction.reply({content:shorter + "\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/" + Suche + " \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.",ephemeral:false})
							.catch(err => {
								console.log(err)
							})
					} else {
						interaction.reply({content:zeroth[0] + "\n" + zeroth[1] + "\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/" + Suche + " \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.",ephemeral:false})
					}
				}
			});

			}
};
