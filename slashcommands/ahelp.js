const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ahelp')
		.setDescription('admin help'),
	async execute(interaction) {

		if (!interaction.member.roles.cache.some(role => role.id === "450742960678764544")) {
		await interaction.reply({content: "Du hast keine Berechtigung dafür", ephemeral:true})
		return;
		}

		var AHelpembed = new EmbedBuilder()
		.setColor(0xd62433)
		.setTitle("ClixoomBot Admin Commands:")
		.addFields(
		{name: "Befehle" ,value:"``/givenvc user: @user betrag: [betrag]`` - Gibt @user [betrag] Nova-Coins\n ``/remnvc user: @user betrag: [betrag]`` - Entzieht @user [betrag] Nova-Coins\n ``/setnvc user: @user betrag: [betrag]`` - Setzt NVC von @user\n ``/stats`` - Zeigt dir ein paar Allgemeine Statistiken \n ``/archiv kanal: #channel ``- Archiviert den Kanal von @user und gibt ihm die nötigen nvc\n ``/unlink user: @user`` - Nimmt @user die Rechte an seinem Kanal\n ``/reset user: @user ``- Alles von dem User löschen" },
		)

		await interaction.reply({embeds:[AHelpembed], ephemeral:true});
	},
};
