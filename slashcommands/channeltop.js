const Discord = require('discord.js');
let SlashCommandBuilder = Discord.SlashCommandBuilder
const Channel = require('../models/channels')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nvctop')
		.setDescription('Zeigt dir die Top10 der Leute mit den best laufenden Channel(s) an.'),
	async execute(interaction) {
		try{
			Channel.find()
		.exec()
		.then(async (docs) => {

			channelarr = docs

			channelarr.sort(function(a, b) {
				return b.messagecount - a.messagecount;
			});

			var TopEmbed = new Discord.MessageEmbed()
				.setColor(0xe19517)
				.setTitle("Die (bis zu) 10 Leute mit den best laufenden Channel(s)")
				.setFooter("Heute ist der: " + Date("now"))
			for (var i = 0; i < channelarr.length; i++) {

				TopEmbed.addField("឵឵ ឵឵ ឵឵", "" + (i + 1) + ". <#" + channelarr[i].channelid + "> von <@" + channelarr[i].ownerid + "> mit " + channelarr[i].messagecount + "Nachrichten. \n( Stand " + moment(channelarr[i].lastcachedate).format('DD MMMM YYYY, HH:MM') + " )")
			}
			await interaction.reply({embeds:[TopEmbed],ephemeral:true});
		}).catch(err => console.error(err))

		}
		catch {
			await interaction.reply({content:`Irgendwas ist gewaltig schief gelaufen`,ephemeral:true});
		}
	},
};

