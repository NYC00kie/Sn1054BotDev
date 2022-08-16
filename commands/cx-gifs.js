const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.template = (message) => {
	message.channel.send("template Emote-gif");
	// message.channel.send({
	// 				files: ["./commands/cxgifs/bye.gif"]
	// 			});
}
