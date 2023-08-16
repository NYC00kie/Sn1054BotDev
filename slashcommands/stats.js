const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const howmany = require('../methodes/howmany');

module.exports = {
	cooldown: 43200,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('statistiken der Datenbank. Nur für Admins'),
	async execute(interaction) {
		await interaction.reply({content:`lade, bitte warten`,ephemeral:false});

		Sale.find()
		.exec()
		.then(async docs => {
			var savedUser = 0
			var cxcstat = 0
			var mesgstat = 0
			var Stammgast = 0
			var Bohr = 0
			var Curie = 0
			var Tesla = 0
			var Newton = 0
			var Einstein = 0
			var Hawking = 0
			var Musk = 0
			var Vip = 0
			var Clixoomer = 0
			var Quasar = 0
			for (var i = 0; i < docs.length; i++) {
				let Wert = await howmany.roleseach(docs[i].MemberId)
				cxcstat = docs[i].cxc + cxcstat
				mesgstat = mesgstat + docs[i].messages
				savedUser = savedUser + 1
				Stammgast = Wert.Stammgast + Stammgast
				Bohr = Wert.Bohr + Bohr
				Curie = Wert.Curie + Curie
				Tesla = Wert.Tesla + Tesla
				Newton = Wert.Newton + Newton
				Einstein = Wert.Einstein + Einstein
				Hawking = Wert.Hawking + Hawking
				Musk = Wert.Musk + Musk
				Vip = Wert.Vip + Vip
				Clixoomer = Wert.Clixoomer + Clixoomer
				Quasar = Wert.Quasar + Quasar

			}
			var Statsembed = new EmbedBuilder()
				.setColor(0xe19517)
				.setTitle("Statistiken:")
				.addFields(
				{name:"Gesamte User:",value: ""+ savedUser},
				{name:"Gesamte NVC:", value: ""+cxcstat},
				{name:"Gesamt gespeicherte Nachrichten:", value: ""+mesgstat},
				{name:"User mit Gaswolke", value: ""+Stammgast},
				{name:"User mit Brauner Zwerg", value: ""+Bohr},
				{name:"User mit Roter zwerg", value: ""+Curie},
				{name:"User mit Weißer zwerg", value: ""+Tesla},
				{name:"User mit hauptreihenstern", value: ""+Newton},
				{name:"User mit Roter Riese", value: ""+Einstein},
				{name:"User mit Supernova", value: ""+Hawking},
				{name:"User mit Neutronen Stern", value: ""+Musk},
				{name:"User mit Schwarzes Loch", value: ""+Vip},
				{name:"User mit Pulsar", value: ""+Clixoomer},
				{name:"User mit Quasar", value: ""+Quasar})
			await interaction.editReply({content:"",embeds:[Statsembed], ephemeral:false});
		
		})
	}
};
