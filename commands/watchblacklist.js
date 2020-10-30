const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const fs = require('fs');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
})

exports.word = (message) => {
  this.message = message
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
     this.message.channel.send("Du hast keine Berechtigung dafür")
     return;
   }
  fs.readFile('./bannedwords/blacklist.txt',"utf8",(err, data) => {
    this.message.channel.send(data)
  })
}

exports.channel = (message) => {
  this.message = message
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
     this.message.channel.send("Du hast keine Berechtigung dafür")
     return;
   }
   fs.readFile('./bannedwords/channelblacklist.txt',"utf8",(err, data) => {
     this.message.channel.send(data)
   })
}
