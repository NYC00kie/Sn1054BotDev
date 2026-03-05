const {EmbedBuilder,SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shophelp')
		.setDescription('user help page'),
	async execute(interaction) {

		var Helpembed = new EmbedBuilder()
		.setColor(0xd62433)
		.setTitle("SNBot Shop Page")
		.addFields(
		{name:"Commands", value: "``/shophelp`` -> Hilfe anzeigen\n ``/buyrole rolle: [Rollenname]`` -> Eine Rolle kaufen\n ``/sellrole rolle: [Rollenname]`` -> Eine verkaufbare Rolle verkaufen (5% Wertverlust)\n Bsp.: ``/buyrole rolle:gaswolke``"},
		{name:"Allgemeine Leistungen", value: "Nickname ändern:\n In Bearbeitung"},
		{name:"Emotes (Gif's)", value: "Demnächst wieder verfügbar"},
		{name:"Rollen zum Kaufen", value: "Quasar = .buyrole quasar\nKaufen: 115'000 Nova-Coins\n Pulsar  = .buyrole pulsar\nKaufen: 95'000 Nova-Coins \nSchwarzes-Loch  = .buyrole schwarzes-loch\nKaufen: 80'000 Nova-Coins \nNeutronen-Stern   = .buyrole neutronen-stern\nKaufen: 75'000 Nova-Coins \nSupernova = .buyrole supernova\nKaufen: 50'000 Nova-Coins \nRoter-Riese  = .buyrole roter-riese\nKaufen: 25'000 Nova-Coins \n Hauptreihenstern  = .buyrole hauptreihenstern\nKaufen: 20'000 Nova-Coins"},
		{name:"​", value: "Weißer-Zwerg   = .buyrole weißer-zwerg\nKaufen: 13'000 Nova-Coins \n Roter-Zwerg  = .buyrole roter-zwerg\nKaufen: 7'500 Nova-Coins \n Brauner-Zwerg  = .buyrole brauner-zwerg\nKaufen: 6'000 Nova-Coins \n Gaswolke = .buyrole gaswolke\nKaufen: 3'750 Nova-Coins\n memes. = .buyrole memes\nKaufen: 50 Nova-Coins"},
		{name:"Zusätzliches", value: "Bei Problemen mit diesem Bot kann man sich gerne bei mir über Discord melden:\n < 376394812888186890> , oder beim SN1054 Discord Team.\nMehr Befehle kommen bald. Vorschläge kannst du in den Chat #ideen-feedback schreiben.\n Bugs sind bitte direkt bei mir oder beim Clixoom Discord Team zu melden.\n Viel Spaß c:"},
		)
		.setFooter("erstellt von: Nici \nXMR:82jEH9rqCo88nDDE3ybmpfZacjtYPH99AD9ES6txNn714SbWG2izuzKi1JWY5ea8Ea7ERiroHUXULWFG41PXPPe36kN6FKc")

		await interaction.reply({embeds:[Helpembed], ephemeral:true});
	},
};
