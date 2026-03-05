const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');
const Loghandler = require('../methodes/Loghandler');
const howmany = require('../methodes/howmany');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Erstelle deinen eigenen Diskussionskanal.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Der Name deines Kanals (ohne Leerzeichen)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('beschreibung')
				.setDescription('Die Beschreibung deines Kanals')
				.setRequired(true)),
	async execute(interaction) {
		const name = interaction.options.getString('name');
		const beschreibung = interaction.options.getString('beschreibung');
		const memberId = interaction.user.id;

		try {
			const docs = await Sale.findOne({ MemberId: memberId });
			if (!docs) {
				return interaction.reply({ content: 'Du hast noch kein Profil.', ephemeral: true });
			}

			if (docs.Channelid !== "undefined" && docs.Channelid2 !== "undefined") {
				return interaction.reply({ content: "Du hast bereits 2 Kanäle.", ephemeral: true });
			}

			// If user has one channel, check for roles for a second one
			if (docs.Channelid !== "undefined") {
				const rolesCount = await howmany.roles(memberId);
				if (rolesCount <= 1) {
					return interaction.reply({ content: "Du hast bereits einen Kanal und nicht genug Rollen, um einen weiteren zu erstellen.", ephemeral: true });
				}
			}

			await interaction.deferReply({ ephemeral: true });

			const newChannel = await interaction.guild.channels.create({
				name: name,
				type: 0, // GuildText
				topic: `${beschreibung} | <@${memberId}>`,
				parent: "451776378938064897"
			});

			await newChannel.lockPermissions();
			await newChannel.send(`<@${memberId}> dein Channel wurde erstellt`);

			if (docs.Channelid === "undefined") {
				await Sale.updateOne({ _id: docs._id }, {
					$set: {
						Channelid: newChannel.id,
						createdDate: new Date()
					}
				});
			} else {
				await Sale.updateOne({ _id: docs._id }, {
					$set: {
						Channelid2: newChannel.id,
						createdDate2: new Date()
					}
				});
			}

			Loghandler.log(interaction, interaction.user, undefined, "channelcreate", undefined, newChannel.id);

			await interaction.editReply({ content: `Dein Kanal <#${newChannel.id}> wurde erfolgreich erstellt.` });

		} catch (err) {
			console.error(err);
			if (interaction.deferred) {
				await interaction.editReply({ content: 'Fehler beim Erstellen des Kanals.' });
			} else {
				await interaction.reply({ content: 'Fehler beim Erstellen des Kanals.', ephemeral: true });
			}
		}
	},
};
