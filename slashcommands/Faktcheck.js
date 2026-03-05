const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('faktcheck')
		.addStringOption(option =>
			option
				.setName('suche')
				.setDescription('Der Suchbegriff zur Suche')
				.setRequired(true)
				.setMaxLength(100))
		.setDescription('Ein Fakten Check, der die ersten paar Zeilen Wikipedias ausgibt'),
	async execute(interaction) {
		const query = interaction.options.getString('suche');
		let Suche = encodeURIComponent(query);

		const url = "https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=" + Suche + "&indexpageids";

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return interaction.reply({ content: "Fehler beim Verbinden mit Wikipedia.", ephemeral: true });
			}

			const wiki = await response.json();
			const pageids = wiki.query.pageids;
			const pageid = pageids[0];
			const pages = wiki.query.pages;

			if (pageid === "-1" || !pages[pageid].extract) {
				return interaction.reply({ content: "Es scheint so, als hätte deine Suche (" + query + ") kein Ergebnis. \nVersuche es sonst noch einmal mit dem Wort im Singular. \nEs könnte außerdem sein, dass du dich verschrieben hast.", ephemeral: false });
			}

			const pageContent = pages[pageid].extract;
			const zeroth = pageContent.split("\n");
			const shorter = zeroth[0].substr(0, 1800);

			if (pageContent.length >= 1800) {
				await interaction.reply({ content: shorter + "\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/" + Suche + " \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.", ephemeral: false });
			} else {
				await interaction.reply({ content: zeroth[0] + (zeroth[1] ? "\n" + zeroth[1] : "") + "\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/" + Suche + " \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.", ephemeral: false });
			}
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "Ein interner Fehler ist aufgetreten.", ephemeral: true });
		}
	}
};
