const mongoose = require('mongoose');
const Sale = require('../models/sale');
const { EmbedBuilder } = require('discord.js');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	auth: {
		user: process.env.Mailadress,
		pass: process.env.Mailpw
	}
});


exports.add_Profile_new = async (member) => {
	const Profile = new Sale({
		_id: new mongoose.Types.ObjectId(),
		Name: "<@" + member.id + ">",
		Name2: "<@!" + member.id + ">",
		Nickname: member.user.username,
		MemberId: member.id,
		Date: new Date(),
		lastdaily: new Date(),
		Channelid: "undefined",
		Channelid2: "undefined",
		createdDate: new Date(),
		createdDate2: new Date(),
		Prestiege: 0,
		cxc: 0,
		messages: 0,
		memes: 0,
		stammgast: 0,
		Bohr: 0,
		Curie: 0,
		Tesla: 0,
		Newton: 0,
		Einstein: 0,
		Hawking: 0,
		Musk: 0,
		Vip: 0,
		Clixoomer: 0,
		quasar: 0,
		byegif: 0,
		happygif: 0,
		klickgif: 0,
		pointgif: 0,
		sadgif: 0,
		spockgif: 0,
		thumbsgif: 0
	});

	try {
		const results = await Sale.find({ MemberId: member.id });
		if (!results.length) {
			console.log("no such person is in the Database")
			await Profile.save();
			console.log("person saved");
		}
	} catch (err) {
		console.error(err);
	}
}

exports.add_Profile_old = async (message) => {
	const Profile = new Sale({
		_id: new mongoose.Types.ObjectId(),
		Name: message.author.toString(),
		Name2: "<@!" + message.author.id + ">",
		Nickname: message.author.username,
		MemberId: message.author.id,
		Date: new Date(),
		lastdaily: new Date(),
		Channelid: "undefined",
		Channelid2: "undefined",
		createdDate: new Date(),
		createdDate2: new Date(),
		Prestiege: 0,
		cxc: 0,
		messages: 0,
		memes: 0,
		stammgast: 0,
		Bohr: 0,
		Curie: 0,
		Tesla: 0,
		Newton: 0,
		Einstein: 0,
		Hawking: 0,
		Musk: 0,
		Vip: 0,
		Clixoomer: 0,
		quasar: 0,
		byegif: 0,
		happygif: 0,
		klickgif: 0,
		pointgif: 0,
		sadgif: 0,
		spockgif: 0,
		thumbsgif: 0
	});

	try {
		const results = await Sale.find({ MemberId: message.author.id });
		if (!results.length) {
			console.log("no such person is in the Database")
			await Profile.save();
			console.log("person saved");
		}
	} catch (err) {
		console.error(err);
	}
}

exports.remove_Profile = async (member) => {
	try {
		await Sale.deleteOne({ MemberId: member.id });
	} catch (err) {
		console.error(err);
	}
}
