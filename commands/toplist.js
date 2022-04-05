const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const Sale = require('../models/sale');
const Channel = require('../models/channels')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	auth: {
		user: process.env.Mailadress,
		pass: process.env.Mailpw
	}
});

exports.nvctop = (message) => {
	this.message = message;

	Sale.find()
		.exec()
		.then(docs => {

			docs.sort((a, b) => {
				return b.cxc - a.cxc
			})

			//hier den Code zur benutztung des Sortierten Array
			var TopEmbed = new Discord.MessageEmbed()
				.setColor(0xe19517)
				.setTitle("Die 10 Leute mit den meisten nvc")
				.addField("឵឵ ឵឵ ឵឵", "1. " + docs[0].Name + " mit " + docs[0].cxc + "\n\n2. " + docs[1].Name + " mit " + docs[1].cxc + "\n\n3. " + docs[2].Name + " mit " + docs[2].cxc + "\n\n4. " + docs[3].Name + " mit " + docs[3].cxc + "\n\n5. " + docs[4].Name + " mit " + docs[4].cxc + "\n\n6. " + docs[5].Name + " mit " + docs[5].cxc + "\n\n7. " + docs[6].Name + " mit " + docs[6].cxc + "\n\n8. " + docs[7].Name + " mit " + docs[7].cxc + "\n\n9. " + docs[8].Name + " mit " + docs[8].cxc + "\n\n10. " + docs[9].Name + " mit " + docs[9].cxc)
				.setFooter("Heute ist der: " + Date("now"))
			this.message.channel.send(TopEmbed)

		})
		.catch(err => console.error(err))
}

exports.pwtop = (message) => {
	this.message = message;

	Sale.find()
		.exec()
		.then(docs => {

			docs.sort((a, b) => {
				return b.Prestiege - a.Prestiege
			})

			//hier den Code zur benutztung des Sortierten Array
			var TopEmbed = new Discord.MessageEmbed()
				.setColor(0xe19517)
				.setTitle("Die 10 Leute mit dem meisten Prestiegewert")
				.addField("឵឵ ឵឵ ឵឵", "1. " + docs[0].Name + " mit " + docs[0].Prestiege + "\n\n2. " + docs[1].Name + " mit " + docs[1].Prestiege + "\n\n3. " + docs[2].Name + " mit " + docs[2].Prestiege + "\n\n4. " + docs[3].Name + " mit " + docs[3].Prestiege + "\n\n5. " + docs[4].Name + " mit " + docs[4].Prestiege + "\n\n6. " + docs[5].Name + " mit " + docs[5].Prestiege + "\n\n7. " + docs[6].Name + " mit " + docs[6].Prestiege + "\n\n8. " + docs[7].Name + " mit " + docs[7].Prestiege + "\n\n9. " + docs[8].Name + " mit " + docs[8].Prestiege + "\n\n10. " + docs[9].Name + " mit " + docs[9].Prestiege)
				.setFooter("Heute ist der: " + Date("now"))
			this.message.channel.send(TopEmbed)
		})
		.catch(err => console.error(err))
}

exports.messagetop = (message) => {
	this.message = message;

	Sale.find()
		.exec()
		.then(docs => {

			docs.sort((a, b) => {
				return b.messages - a.messages
			})

			//hier den Code zur benutztung des Sortierten Array
			var TopEmbed = new Discord.MessageEmbed()
				.setColor(0xe19517)
				.setTitle("Die 10 Leute mit den meisten Nachrichten")
				.addField("឵឵ ឵឵ ឵឵", "1. " + docs[0].Name + " mit " + docs[0].messages + "\n\n2. " + docs[1].Name + " mit " + docs[1].messages + "\n\n3. " + docs[2].Name + " mit " + docs[2].messages + "\n\n4. " + docs[3].Name + " mit " + docs[3].messages + "\n\n5. " + docs[4].Name + " mit " + docs[4].messages + "\n\n6. " + docs[5].Name + " mit " + docs[5].messages + "\n\n7. " + docs[6].Name + " mit " + docs[6].messages + "\n\n8. " + docs[7].Name + " mit " + docs[7].messages + "\n\n9. " + docs[8].Name + " mit " + docs[8].messages + "\n\n10. " + docs[9].Name + " mit " + docs[9].messages)
				.setFooter("Heute ist der: " + Date("now"))
			this.message.channel.send(TopEmbed)
		})
		.catch(err => console.error(err))
}

exports.channeltop = async (message) => {
	this.message = message;
	this.message.channel.send("Loading Data")
	let channelarr = []

	Channel.find()
		.exec()
		.then(async (docs) => {

			channelarr = docs

			channelarr.sort(function(a, b) {
				return b.messagecount - a.messagecount;
			});

			var TopEmbed = new Discord.MessageEmbed()
				.setColor(0xe19517)
				.setTitle("Die (bis zu) 10 Leute mit den best laufenden Channel(s)")
				.setFooter("Heute ist der: " + Date("now"))
			for (var i = 0; i < channelarr.length; i++) {

				TopEmbed.addField("឵឵ ឵឵ ឵឵", "" + (i + 1) + ". <#" + channelarr[i].channelid + "> von <@" + channelarr[i].ownerid + "> mit " + channelarr[i].messagecount + "Nachrichten. (zuletzt gechached am " + channelarr[i].lastcachedate + " )")
			}
			this.message.channel.send(TopEmbed)
		}).catch(err => { //message fuction
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