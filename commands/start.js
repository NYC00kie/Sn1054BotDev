const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const Loghandler = require('./Loghandler');
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
  var Community = message.member.guild.roles.cache.find(role => role.id === "518385317229625364");
  var Community_member = message.member.roles.cache.find(role => role.id === "518385317229625364");
  if (Community_member!=Community) {
    this.message.member.roles.add("518385317229625364")
    message.client.channels.cache.get("484039225331679253").send("<@"+message.author+">hat sich verifiziert \n Verifikation")
    message.client.channels.cache.get("727919338606166096").send("<@"+message.author+"> Willkommen auf diesem Server")
    Loghandler.log(this.message,this.message.member,undefined,"start",undefined,undefined)
  }
  else {
    this.message.channel.send("Du bist bereits verifiziert")
  }
  message.delete({timeout:1000})
}
