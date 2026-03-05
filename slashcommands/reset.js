const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Setzt das Profil eines Nutzers komplett zurück (Admin only).')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dessen Profil zurückgesetzt werden soll')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some(role => role.id === "450742960678764544")) {
			return interaction.reply({ content: "Du hast keine Berechtigung dafür.", ephemeral: true });
		}

		const targetUser = interaction.options.getUser('user');

		try {
			const docs = await Sale.findOne({ MemberId: targetUser.id });
			if (!docs) {
				return interaction.reply({ content: "Dieser Nutzer hat kein Profil.", ephemeral: true });
			}

			await Sale.updateOne({ _id: docs._id }, {
				$set: {
					Nickname: targetUser.username,
					Date: new Date(),
					lastdaily: new Date(),
					Channelid: "undefined",
					Channelid2: "undefined",
					createdDate: new Date(),
					createdDate2: new Date(),
					cxc: 0,
					Prestiege: 0,
					messages: 0,
					memes: 0,
					stammgast: 0,
					Bohr: 0,
					Curie: 0,
					Tesla: 0,
					Newton: 0,
					Einstein: 0,
					Hawking: 0,
					Musk: 0,
					Vip: 0,
					Clixoomer: 0,
					quasar: 0,
					byegif: 0,
					happygif: 0,
					klickgif: 0,
					pointgif: 0,
					sadgif: 0,
					spockgif: 0,
					thumbsgif: 0
				}
			});

			const logChannel = interaction.client.channels.cache.get("509757254862372883");
			if (logChannel) {
				await logChannel.send(`<@${targetUser.id}>s Account wurde zurückgesetzt \n Reset`);
			}

			await interaction.reply({ content: `Das Profil von <@${targetUser.id}> wurde erfolgreich zurückgesetzt.`, ephemeral: true });

		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Fehler beim Zurücksetzen des Profils.", ephemeral: true });
		}
	},
};
