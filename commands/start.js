const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

exports.start = (message) => {
  this.message = message;
  var Community = message.member.guild.roles.find(role => role.id === "518385317229625364");
  var Community_member = message.member.roles.find(role => role.id === "518385317229625364");
  if (Community_member!=Community) {
    this.message.member.addRole(Community)
  }
  else {
    this.message.channel.send("Du bist bereits verifiziert")
  }
}
