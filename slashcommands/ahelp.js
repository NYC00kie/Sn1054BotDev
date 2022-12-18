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
		{name: "Befehle" ,value:"``.givenvc @user [betrag]`` - Gibt @user [betrag] Cx-Coins\n ``.remnvc @user [betrag]`` - Entzieht @user [betrag] Cx-Coins\n NUR FÜR NOTFALL: ``.setnvc @user [betrag]``\n ``.stats`` - Zeigt dir ein paar Allgemeine Statistiken \n ``.archiv #channel ``- Archiviert den Kanal von @user und gibt ihm die nötigen nvc\n ``.unlink @user`` - Nimmt @user die Rechte an seinem Kanal\n NUR FÜR NOTFALL: ``.link @user #kanal``(noch nicht in arbeit, weil es eher unwichtig ist)\n ``.reset @user ``Alles von dem user löschen \n `` .addblacklist [Wort]`` - Fügt ein Wort der Blacklist hinzu und mit diesem Wort können keine nvc mehr bekommen werden\n`` .addchannel [channelid] `` - fügt die Channel id der blacklist hinzu, in dem keine nvc mehr bekommen werden können.\n`` .watchword `` - Wörter Blacklist einsehen.\n`` .watchchannel `` - Channel Blacklist einsehen." },
		)

		await interaction.reply({embeds:[AHelpembed], ephemeral:true});
	},
};
