const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
exports.check_word = (message) => {
  this.message = message;

  Splitmessage = this.message.content.split(" ")
  var data = fs.readFileSync('./bannedwords/blacklist.txt',"utf8")
      let words = data.split("|")
        for (i=0;i<Splitmessage.length;i++) {
          for (j = 0; j< words.length;j++) {
            if (Splitmessage[i]==words[j]) {
              message.client.channels.get("509757254862372883").send(message.author+"hat ein geblacklistetes Wort ("+words[j]+") geschriebenen \n Blacklist")
              return false;
            }
          }
        }
}

exports.check_channel =  (message) => {
  this.message = message;
  var x
  console.log(x)
  var data = fs.readFileSync('./bannedwords/channelblacklist.txt',"utf8")
    let channelid = data.split("|")
      for (i = 0; i < channelid.length; i++) {
        if (this.message.channel.id==channelid[i]) {
          console.log(false);
          return false;
        }
        if (i == channelid.length-1) {
          console.log(true);
          return true;
        }
      }

    console.log(x)
}
