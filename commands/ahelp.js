const Discord = require('discord.js');

exports.get_adminhelp = (message) => {
	this.message = message;
	if (!message.member.roles.cache.some(role => role.id === "450742960678764544")) {
		this.message.channel.send("Du hast keine Berechtigung dafür")
		return;
	}
	var AHelpembed = new Discord.MessageEmbed()
		.setColor(0xd62433)
		.setTitle("ClixoomBot Admin Commands:")
		.addField("Befehle", "``.givenvc @user [betrag]`` - Gibt @user [betrag] Cx-Coins\n ``.remnvc @user [betrag]`` - Entzieht @user [betrag] Cx-Coins\n NUR FÜR NOTFALL: ``.setnvc @user [betrag]``\n ``.stats`` - Zeigt dir ein paar Allgemeine Statistiken \n ``.archiv #channel ``- Archiviert den Kanal von @user und gibt ihm die nötigen nvc\n ``.unlink @user`` - Nimmt @user die Rechte an seinem Kanal\n NUR FÜR NOTFALL: ``.link @user #kanal``(noch nicht in arbeit, weil es eher unwichtig ist)\n ``.reset @user ``Alles von dem user löschen \n `` .addblacklist [Wort]`` - Fügt ein Wort der Blacklist hinzu und mit diesem Wort können keine nvc mehr bekommen werden\n`` .addchannel [channelid] `` - fügt die Channel id der blacklist hinzu, in dem keine nvc mehr bekommen werden können.\n`` .watchword `` - Wörter Blacklist einsehen.\n`` .watchchannel `` - Channel Blacklist einsehen.")
	this.message.channel.send(AHelpembed);

}