const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');

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
		const selectedrole = interaction.options.getRole('role')
		console.log(selectedrole)
		await interaction.deferReply( {ephemeral: false} );

		const Author = interaction.member
		const MemberID = interaction.member.id
		const Search = selectedrole.name
		Sale.findOne({
				MemberId: MemberID
			})
			.exec()
			.then(async docs => {
				if (Search == "Memes") {
					if (docs.memes == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 50) {
						interaction.member.roles.add("518395092197965845")
						interaction.editReply("Du hast die Rolle für: **50nvc** gekauft")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 50,
									memes: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518395092197965845", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Gaswolke") {
					if (docs.stammgast == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 3750) {
						interaction.editReply("Du hast die Rolle für: **3750nvc** gekauft")
						interaction.member.roles.add("518395091472089101")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 3750,
									stammgast: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518395091472089101", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Brauner-Zwerg") {
					if (docs.Bohr == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 6000) {
						interaction.editReply("Du hast die Rolle für: **6000nvc** gekauft")
						interaction.member.roles.add("518384555007148042")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 6000,
									Bohr: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384555007148042", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Roter-Zwerg") {
					if (docs.Curie == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 7500) {
						interaction.editReply("Du hast die Rolle für: **7500nvc** gekauft")
						interaction.member.roles.add("518384549408014343")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 7500,
									Curie: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384549408014343", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Weißer-Zwerg") {
					if (docs.Tesla == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 13000) {
						interaction.editReply("Du hast die Rolle für: **13000nvc** gekauft")
						interaction.member.roles.add("518384546492973056")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 13000,
									Tesla: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384546492973056", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Hauptreihenstern") {
					if (docs.Newton == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 20000) {
						interaction.editReply("Du hast die Rolle für: **20000nvc** gekauft")
						interaction.member.roles.add("518384356222566410")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 20000,
									Newton: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384356222566410", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Roter-Riese") {
					if (docs.Einstein == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 25000) {
						interaction.editReply("Du hast die Rolle für: **25000nvc** gekauft")
						interaction.member.roles.add("518384355698278430")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 25000,
									Einstein: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384355698278430", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Supernova") {
					if (docs.Hawking == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 50000) {
						interaction.editReply("Du hast die Rolle für: **50000nvc** gekauft")
						interaction.member.roles.add("518384354880258049")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 50000,
									Hawking: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384354880258049", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Neutronen-Stern") {
					if (docs.Musk == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 75000) {
						interaction.editReply("Du hast die Rolle für: **75000nvc** gekauft")
						interaction.member.roles.add("518384354272215060")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 75000,
									Musk: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384354272215060", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Schwarzes-Loch") {
					if (docs.Vip == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 80000) {
						interaction.editReply("Du hast die Rolle für: **80000nvc** gekauft")
						interaction.member.roles.add("518384353387085845")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 80000,
									Vip: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518384353387085845", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Pulsar") {
					if (docs.Clixoomer == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 95000) {
						interaction.editReply("Du hast die Rolle für: **95000nvc** gekauft")
						interaction.member.roles.add("518172524811386890")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 95000,
									Clixoomer: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "518172524811386890", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else if (Search == "Quasar") {
					if (docs.quasar == 1) {
						interaction.editReply("Du hast diese Rolle schon")
					} else if (docs.cxc >= 115000) {
						interaction.editReply("Du hast die Rolle für: **115000nvc** gekauft")
						interaction.member.roles.add("700740599195893760")
						Sale.updateOne({
								_id: docs._id
							}, {
								$set: {
									cxc: docs.cxc - 115000,
									quasar: 1
								}
							})
							.exec()
							.then(docs => {
								Loghandler.log(message, Author, undefined, "buyrole", "700740599195893760", undefined)
							})
					} else {
						interaction.editReply("Du hast nicht genug nvc")
					}

				}
				else {
					await interaction.editReply("Etwas ist schief gegangen.\nbitte definiere eine Rolle, die du kaufen kannst")
				}
			})

	},
};