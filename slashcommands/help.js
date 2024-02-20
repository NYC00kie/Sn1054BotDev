const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('user help page'),
	async execute(interaction) {

		var Helpembed = new EmbedBuilder()
		.setColor(0xd62433)
		.setTitle("SNBot Help Page")
		.addFields(
		{name:"Hinweise", value:"Achte darauf, dass du vor jeden Befehl einen . setzen musst. \nBeispiel: ``.help`` \nAchtung! Benutze keine eckigen Klammern in den Befehlen:\n ``.transfer  user [betrag] = .transfer  Maxmustermann#0000 1000`` \n\nAußerdem solltest du allgemein darauf achten, dass du den Syntax und die Rechtschreibung des Befehls richtig nutzt." },
		{name:"Allgemein", value:"``.help`` - Zeigt dir dieses Hilfe-Menü \n``.profil`` - Zeigt dir dein Clixoom-Profil (mit deinem Guthaben, etc.) \n``.profil  user`` - Zeigt dir das Clixoom-Profil von  user (In Progress) \n``.shop`` - Zeigt dir eine Liste aller Items und Shop-Befehle\n``.dev`` - Zeigt dir eine Liste von Dingen an, welche gerade am Bot gemacht werden/ im nächsten update rauskommen.\n``.ping`` - zeigt dir die Latenz des Bots und der Discord API an."},
		{name:"Währungsbefehle", value:".nvc - Damit kannst du sehen, wie viele Nova-Coins du gesammelt hast\n ``.nvc  user`` - Damit kannst du sehen, wie viele Nova-Coins  user gesammelt hat\n ``.transfer  user [betrag]`` - Damit sendest du  user eine gewünschte Anzahl an Nova-Coins \n ``.nvctop``- Damit siehst du die reichsten Leute auf dem Server\n ``.messagetop``- Damit siehst du die Leute, die am meisten gespeicherte Nachriten haben\n ``.pwtop``- Damit siehst du die Leute, die am meisten Prestiegewert haben \n **ACHTUNG! Die Rollen bei Befehlen immer klein schreiben!**\n Bsp.: ``.buyrole schwarzes-loch``"},
		{name:"Kanalsystem", value: "Hinweise:\n Diese System ist nur für wissenschaftliche Themen gedacht! Andere Themen werden sofort gelöscht.\n Den Namen des Kanals immer ohne Leerzeichen schreiben (Die Beschreibung darf Leerzeichen enthalten)\n Eigene Kanäle können erst gelöscht werden, wenn 24h nichts mehr in ihnen geschrieben wurde.\n Nachdem man seinen Kanal geschlossen hat erhält man eine kleine Belohnung in Form von Nova-Coins (die Anzahl richtet sich nach der vorherigen Aktivität des Channels)\n Missbrauch in Form von Spam usw. wird nicht tolleriert.\n ``.create [name] [beschreibung]`` - Erstellt einen eigenen Diskussionskanal\n ``.chstats`` - Zeigt dir Statistiken zu deinem Kanal an\n ``.delete`` - Löscht deinen eigenen Kanal"},
		{name:"Zusätzliches", value:"Bei Problemen mit diesem Bot kann man sich gerne bei mir über Discord melden:\n < 376394812888186890> , oder beim Clixoom Discord Team.\nMehr Befehle kommen bald. Vorschläge kannst du in den Chat <#518388012149899294> schreiben.\n Bugs sind bitte direkt bei mir oder beim Clixoom Discord Team zu melden.\n Viel Spaß c:"}
		)
		.setFooter("erstellt von: Nici und mit der Hilfe von Clara")

		await interaction.reply({embeds:[Helpembed], ephemeral:true});
	},
};
