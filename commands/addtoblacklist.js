const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

exports.add_word = (message, NewWord) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }

  fs.writeFile('./bannedwords/blacklist.txt', "|"+NewWord, {flag:'a'},function (err) {
  if (err) throw err;
  console.log('Word: '+NewWord+' added to Blacklist!');
});
}
