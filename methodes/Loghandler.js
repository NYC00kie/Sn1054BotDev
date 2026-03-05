const { EmbedBuilder } = require('discord.js');

exports.log = (interaction, User, User2, Type, Role, Channel) => {
	const logEmbed = new EmbedBuilder()
		.setTitle(Type)
		.setColor(0xe19517);

	let logmessage = '';

	if (Type == "daily") {
		logmessage = `${User}\n hat 300 nvc bekommen`;
	} else if (Type == "channelcreate") {
		logmessage = `${User}\n hat den Kanal <#${Channel}> erstellt`;
	} else if (Type == "channeldelete") {
		logmessage = `${User}\n hat den Kanal <#${Channel}> gelöscht`;
	} else if (Type == "buyrole") {
		logmessage = `${User}\n hat die Rolle <@&${Role}> gekauft`;
	} else if (Type == "sellrole") {
		logmessage = `${User}\n hat die Rolle <@&${Role}> verkauft`;
	} else if (Type == "sellroleall") {
		logmessage = `${User}\n hat alle Rollen verkauft`;
	} else if (Type == "transfer") {
		logmessage = `Betrag wurde von ${User} an ${User2} übertragen`;
	} else if (Type == "channelarchiv") {
		logmessage = `<#${Channel}>\n wurde von einem Admin archiviert`;
	} else if (Type == "cxcgifs") {
		logmessage = `${User}\n hat ${Role} gekauft`;
	} else if (Type == "start") {
		logmessage = `${User}\n hat sich freigeschaltet`;
	} else if (Type == "blacklist") {
		logmessage = `${User}\n hat ein blacklisted Wort geschrieben (${Role})`;
	} else if (Type == "morenvc") {
		logmessage = `${User}\n hat mehr NVC bekommen durch ein Chat Event.`;
	}

	logEmbed.addFields({ name: `${Type}`, value: `${logmessage || 'No description provided'}` });
	
	const client = interaction.client || interaction.guild.client;
	const channelObj = client.channels.cache.get("509757254862372883");
	if (channelObj) {
		channelObj.send({ embeds: [logEmbed] }).catch(console.error);
	}
}
