const Discord = require('discord.js');
let SlashCommandBuilder = Discord.SlashCommandBuilder
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nvctop')
		.setDescription('Zeigt dir die Top10 der Leute mit den meisten Nachrichten an.'),
	async execute(interaction) {
		try{
			Sale.find()
			.exec()
			.then(docs => {

				docs.sort((a, b) => {
					return b.messages - a.messages
				})

				//hier den Code zur benutztung des Sortierten Array
				var TopEmbed = new Discord.MessageEmbed()
					.setColor(0xe19517)
					.setTitle("Die 10 Leute mit den meisten Nachrichten")
					.addField("឵឵ ឵឵ ឵឵", "1. " + docs[0].Name + " mit " + docs[0].cxc + "\n\n2. " + docs[1].Name + " mit " + docs[1].cxc + "\n\n3. " + docs[2].Name + " mit " + docs[2].cxc + "\n\n4. " + docs[3].Name + " mit " + docs[3].cxc + "\n\n5. " + docs[4].Name + " mit " + docs[4].cxc + "\n\n6. " + docs[5].Name + " mit " + docs[5].cxc + "\n\n7. " + docs[6].Name + " mit " + docs[6].cxc + "\n\n8. " + docs[7].Name + " mit " + docs[7].cxc + "\n\n9. " + docs[8].Name + " mit " + docs[8].cxc + "\n\n10. " + docs[9].Name + " mit " + docs[9].cxc)
					.setFooter("Heute ist der: " + Date("now"))
				await interaction.reply({embeds:[TopEmbed],ephemeral:true});
			})
			.catch(err => console.error(err))

		}
		catch {
			await interaction.reply({content:`Irgendwas ist gewaltig schief gelaufen`,ephemeral:true});
		}
	},
};

