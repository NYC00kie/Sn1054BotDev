// importing of modules
const dotenv = require('dotenv');
dotenv.config();
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const manageprofile = require("./methodes/manageprofile");

// beginning of the Code
var args = process.argv.slice(2);

// for Testing
if (args.length == 8) {
	process.env = {
		TOKEN: args[0],
		Mailpw: args[1],
		Mailadress: args[2],
		MyMailadress: args[3],
		Password: args[4],
		DB: args[5],
	};
}

let bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences
	]
});

bot.login(process.env.TOKEN);
bot.on('error', console.error);

bot.on('ready', async () => {
	bot.user.setPresence({
		activities: [{
			name: '/help',
			type: ActivityType.Playing
		}],
		status: 'online'
	});
	console.log("Bot Online :)");
});

// connect to DB
mongoose.connect('mongodb+srv://NY_Cookie:' + process.env.Password + '@clixoom-bot.oj9lk.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	dbName: process.env.DB,
}).then(() => {
	console.log('\nconnected to database\n');
}).catch(err => console.error(err));
mongoose.Promise = global.Promise;

bot.on("guildMemberUpdate", function(oldMember, newMember) {
	if (oldMember._roles != newMember._roles) {
		for (var i = 0; i < oldMember._roles.length; i++) {
			if (oldMember._roles[i] == "518385317229625364") {
				return;
			}
		}
		for (var j = 0; j < newMember._roles.length; j++) {
			if (newMember._roles[j] == "518385317229625364") {
				bot.channels.cache.get("727919338606166096").send(`<@${newMember.user.id}> Willkommen und schön, dass du es bis hier her geschafft hast 👍`);
				return;
			}
		}
	}
});

bot.on("guildMemberAdd", member => {
	manageprofile.add_Profile_new(member); // add profile to DB when entering the Server
});

bot.on("guildMemberRemove", member => {
	manageprofile.remove_Profile(member); // remove profile from DB when leaving the server
});

// Slash Commands
// Loading
bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'slashcommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Executing Slash Commands
bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
