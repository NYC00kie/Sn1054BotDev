const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profil')
		.setDescription('Zeigt dir dein Profil oder das eines anderen Nutzers an.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Der Nutzer, dessen Profil du sehen möchtest')),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('user') || interaction.user;
		const member = interaction.guild.members.cache.get(targetUser.id);

		try {
			const docs = await Sale.findOne({ MemberId: targetUser.id }).exec();
			
			if (!docs) {
				return interaction.reply({ content: 'Dieser Nutzer hat noch kein Profil.', ephemeral: true });
			}

			const roles = [
				{ key: 'memes', label: 'memes' },
				{ key: 'stammgast', label: 'gaswolke' },
				{ key: 'Bohr', label: 'brauner-zwerg' },
				{ key: 'Curie', label: 'roter-zwerg' },
				{ key: 'Tesla', label: 'weißer-zwerg' },
				{ key: 'Newton', label: 'hauptreihenstern' },
				{ key: 'Einstein', label: 'roter-riese' },
				{ key: 'Hawking', label: 'supernova' },
				{ key: 'Musk', label: 'neutronen-stern' },
				{ key: 'Vip', label: 'schwarzes-loch' },
				{ key: 'Clixoomer', label: 'pulsar' },
				{ key: 'quasar', label: 'quasar' }
			];

			let rolesString = roles
				.filter(r => docs[r.key] != 0)
				.map(r => r.label)
				.join('\n');
			
			if (!rolesString) rolesString = '.';

			const channel = docs.Channelid === "undefined" ? "kein Channel" : `<#${docs.Channelid}>`;
			const joinedAt = member ? new Date(member.joinedTimestamp).toLocaleString() : 'Unbekannt';

			const profileEmbed = new EmbedBuilder()
				.setColor(0xe19517)
				.setTitle(`${docs.Nickname}'s Profil:`)
				.setThumbnail(targetUser.displayAvatarURL())
				.addFields(
					{ name: "Dein Prestiegewert:", value: docs.Prestiege.toString(), inline: true },
					{ name: "Deine nvc:", value: docs.cxc.toString(), inline: true },
					{ name: "Deine Rollen:", value: rolesString },
					{ name: "Deine geschriebenen Nachrichten:", value: docs.messages.toString(), inline: true },
					{ name: "Dein aktueller Kanal:", value: channel, inline: true },
					{ name: "Letzte Daily abgeholt:", value: docs.lastdaily ? docs.lastdaily.toLocaleString() : 'Nie' }
				)
				.setFooter({ text: `Server beigetreten: ${joinedAt}` });

			await interaction.reply({ embeds: [profileEmbed] });
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: 'Fehler beim Abrufen des Profils.', ephemeral: true });
		}
	},
};
