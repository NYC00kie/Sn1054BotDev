const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Cxc = require("../commands/cxc");
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const howmany = require('../methodes/howmany');

var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	auth: {
		user: process.env.Mailadress,
		pass: process.env.Mailpw
	}
});

exports.stats = (message) => {
	this.message = message;
	if (!this.message.member.roles.cache.some(role => role.id === "450742960678764544")) {
		this.message.channel.send("Du hast keine Berechtigung dafür")
		return;
	}


	Sale.find()
		.exec()
		.then(async docs => {
			this.message.channel.send("Datenbank wird geladen")
			var savedUser = 0
			var cxcstat = 0
			var mesgstat = 0
			var Stammgast = 0
			var Bohr = 0
			var Curie = 0
			var Tesla = 0
			var Newton = 0
			var Einstein = 0
			var Hawking = 0
			var Musk = 0
			var Vip = 0
			var Clixoomer = 0
			var Quasar = 0
			for (var i = 0; i < docs.length; i++) {
				let Wert = await howmany.roleseach(docs[i].MemberId)
				cxcstat = docs[i].cxc + cxcstat
				mesgstat = mesgstat + docs[i].messages
				savedUser = savedUser + 1
				Stammgast = Wert.Stammgast + Stammgast
				Bohr = Wert.Bohr + Bohr
				Curie = Wert.Curie + Curie
				Tesla = Wert.Tesla + Tesla,
					Newton = Wert.Newton + Newton
				Einstein = Wert.Einstein + Einstein
				Hawking = Wert.Hawking + Hawking
				Musk = Wert.Musk + Musk
				Vip = Wert.Vip + Vip
				Clixoomer = Wert.Clixoomer + Clixoomer
				Quasar = Wert.Quasar + Quasar

			}
			await sleep(3000)
			await Statsembedfunction(Stammgast, Bohr, Curie, Tesla, Newton, Einstein, Hawking, Musk, Vip, Clixoomer, Quasar, cxcstat, mesgstat, savedUser, message)

		})
		.catch(err => { //message fuction
			var e = new Error(err);
			const Es = e.toString()
			var mailOptions = {
				from: process.env.Mailadress,
				to: process.env.MyMailadress,
				subject: "Error",
				text: Es + Date("now")
			};
			transporter.sendMail(mailOptions);
			console.error(err);
		});

}

function Statsembedfunction(Stammgast, Bohr, Curie, Tesla, Newton, Einstein, Hawking, Musk, Vip, Clixoomer, Quasar, cxcstat, mesgstat, savedUser, message) {
	this.message = message;

	var Statsembed = new Discord.MessageEmbed()
		.setColor(0xe19517)
		.setTitle("Statistiken:")
		.addField("Gesamte User:", savedUser)
		.addField("Gesamte NVC:", cxcstat)
		.addField("Gesamt gespeicherte Nachrichten:", mesgstat)
		.addField("User mit Gaswolke", Stammgast)
		.addField("User mit Brauner Zwerg", Bohr)
		.addField("User mit Roter zwerg", Curie)
		.addField("User mit Weißer zwerg", Tesla)
		.addField("User mit hauptreihenstern", Newton)
		.addField("User mit Roter Riese", Einstein)
		.addField("User mit Supernova", Hawking)
		.addField("User mit Neutronen Stern", Musk)
		.addField("User mit Schwarzes Loch", Vip)
		.addField("User mit Pulsar", Clixoomer)
		.addField("User mit Quasar", Quasar)
	this.message.channel.send(Statsembed)
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}