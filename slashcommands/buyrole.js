const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Loghandler = require('../methodes/Loghandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buyrole')
		.setDescription('specify a role to buy')
		.addRoleOption(option => 
			option.setName('role')
				.setDescription('The Role you want to buy')
				.setRequired(true)
		),
	async execute(interaction) {
		const selectedrole = interaction.options.getRole('role');
		const Search = selectedrole.name;
		const member = interaction.member;
		const memberId = interaction.user.id;

		await interaction.deferReply({ ephemeral: false });

		try {
			const docs = await Sale.findOne({ MemberId: memberId }).exec();
			if (!docs) {
				return interaction.editReply("Du hast noch kein Profil.");
			}

			// Define roles mapping
			const rolesMap = {
				"Memes": { db: "memes", id: "518395092197965845", price: 50 },
				"Gaswolke": { db: "stammgast", id: "518395091472089101", price: 3750 },
				"Brauner-Zwerg": { db: "Bohr", id: "518384555007148042", price: 6000 },
				"Roter-Zwerg": { db: "Curie", id: "518384549408014343", price: 7500 },
				"Weißer-Zwerg": { db: "Tesla", id: "518384546492973056", price: 13000 },
				"Hauptreihenstern": { db: "Newton", id: "518384356222566410", price: 20000 },
				"Roter-Riese": { db: "Einstein", id: "518384355698278430", price: 25000 },
				"Supernova": { db: "Hawking", id: "518384354880258049", price: 50000 },
				"Neutronen-Stern": { db: "Musk", id: "518384354272215060", price: 75000 },
				"Schwarzes-Loch": { db: "Vip", id: "518384353387085845", price: 80000 },
				"Pulsar": { db: "Clixoomer", id: "518172524811386890", price: 95000 },
				"Quasar": { db: "quasar", id: "700740599195893760", price: 115000 }
			};

			const roleInfo = rolesMap[Search];
			if (!roleInfo) {
				return interaction.editReply("Etwas ist schief gegangen. Bitte definiere eine Rolle, die du kaufen kannst.");
			}

			if (docs[roleInfo.db] >= 1) {
				return interaction.editReply("Du hast diese Rolle schon.");
			}

			if (docs.cxc < roleInfo.price) {
				return interaction.editReply("Du hast nicht genug NVC.");
			}

			// Add role and update DB
			await member.roles.add(roleInfo.id);
			await Sale.updateOne({ _id: docs._id }, {
				$set: {
					cxc: docs.cxc - roleInfo.price,
					[roleInfo.db]: 1
				}
			});

			Loghandler.log(interaction, interaction.user, undefined, "buyrole", roleInfo.id, undefined);
			await interaction.editReply(`Du hast die Rolle für: **${roleInfo.price} NVC** gekauft.`);

		} catch (err) {
			console.error(err);
			await interaction.editReply("Fehler beim Kauf der Rolle.");
		}
	},
};
