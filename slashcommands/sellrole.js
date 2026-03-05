const { SlashCommandBuilder } = require('discord.js');
const Sale = require('../models/sale');
const Loghandler = require('../methodes/Loghandler');

const ROLES = {
    "gaswolke": { id: "518395091472089101", price: 3750, dbKey: "stammgast" },
    "brauner-zwerg": { id: "518384555007148042", price: 6000, dbKey: "Bohr" },
    "roter-zwerg": { id: "518384549408014343", price: 7500, dbKey: "Curie" },
    "weißer-zwerg": { id: "518384546492973056", price: 13000, dbKey: "Tesla" },
    "hauptreihenstern": { id: "518384356222566410", price: 20000, dbKey: "Newton" },
    "roter-riese": { id: "518384355698278430", price: 25000, dbKey: "Einstein" },
    "supernova": { id: "518384354880258049", price: 50000, dbKey: "Hawking" },
    "neutronen-stern": { id: "518384354272215060", price: 75000, dbKey: "Musk" },
    "schwarzes-loch": { id: "518384353387085845", price: 80000, dbKey: "Vip" },
    "pulsar": { id: "518172524811386890", price: 95000, dbKey: "Clixoomer" },
    "quasar": { id: "700740599195893760", price: 115000, dbKey: "quasar" }
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sellrole')
		.setDescription('Verkaufe eine deiner Rollen zurück für Nova-Coins.')
		.addStringOption(option =>
			option.setName('rolle')
				.setDescription('Die Rolle, die du verkaufen möchtest')
				.setRequired(true)
				.addChoices(
					{ name: 'Alle Rollen', value: 'all' },
					{ name: 'Gaswolke', value: 'gaswolke' },
					{ name: 'Brauner Zwerg', value: 'brauner-zwerg' },
					{ name: 'Roter Zwerg', value: 'roter-zwerg' },
					{ name: 'Weißer Zwerg', value: 'weißer-zwerg' },
					{ name: 'Hauptreihenstern', value: 'hauptreihenstern' },
					{ name: 'Roter Riese', value: 'roter-riese' },
					{ name: 'Supernova', value: 'supernova' },
					{ name: 'Neutronen Stern', value: 'neutronen-stern' },
					{ name: 'Schwarzes Loch', value: 'schwarzes-loch' },
					{ name: 'Pulsar', value: 'pulsar' },
					{ name: 'Quasar', value: 'quasar' }
				)),
	async execute(interaction) {
		const search = interaction.options.getString('rolle');
		const memberId = interaction.user.id;
		const member = interaction.member;

		try {
			const docs = await Sale.findOne({ MemberId: memberId });
			if (!docs) {
				return interaction.reply({ content: 'Du hast noch kein Profil.', ephemeral: true });
			}

			if (search === 'all') {
				let totalReward = 0;
				const roleIdsToRemove = [];
				const dbUpdate = {
					$set: {
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
						quasar: 0
					}
				};

				for (const key in ROLES) {
					if (docs[ROLES[key].dbKey] === 1) {
						totalReward += ROLES[key].price;
						roleIdsToRemove.push(ROLES[key].id);
					}
				}

				if (totalReward === 0) {
					return interaction.reply({ content: "Du hast keine verkaufbaren Rollen.", ephemeral: true });
				}

				dbUpdate.$set.cxc = docs.cxc + totalReward;

				await Sale.updateOne({ _id: docs._id }, dbUpdate);

				for (const roleId of roleIdsToRemove) {
					await member.roles.remove(roleId).catch(console.error);
				}
				// Special Case Memes (from original code)
				await member.roles.remove("518395092197965845").catch(console.error);

				Loghandler.log(interaction, interaction.user, undefined, "sellroleall", undefined, undefined);

				await interaction.reply({ content: `Alle deine Rollen wurden verkauft für **${totalReward} NVC**.` });
				await interaction.user.send("Alle deine Rollen wurden verkauft und es wird keine Rückerstattung geben.").catch(() => {});

			} else {
				const roleInfo = ROLES[search];
				if (!roleInfo) {
					return interaction.reply({ content: "Ungültige Rolle.", ephemeral: true });
				}

				if (docs[roleInfo.dbKey] === 0) {
					return interaction.reply({ content: "Du hast diese Rolle noch nicht.", ephemeral: true });
				}

				await member.roles.remove(roleInfo.id);
				await Sale.updateOne({ _id: docs._id }, {
					$set: {
						cxc: docs.cxc + roleInfo.price,
						[roleInfo.dbKey]: 0
					}
				});

				Loghandler.log(interaction, interaction.user, undefined, "sellrole", roleInfo.id, undefined);

				await interaction.reply({ content: `Die Rolle **${search}** wurde für **${roleInfo.price} NVC** verkauft.` });
			}

		} catch (err) {
			console.error(err);
			await interaction.reply({ content: 'Fehler beim Verkaufen der Rolle.', ephemeral: true });
		}
	},
};
