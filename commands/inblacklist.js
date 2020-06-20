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
  fs.readFile('./bannedwords/blacklist.txt',"utf8",(err, data) => {
    if (err) throw err;
      let words = data.split("|")
        for (i=0;i<Splitmessage.length;i++) {
          for (j = 0; j< words.length;j++) {
            if (Splitmessage[i]==words[j]) {
              message.client.channels.get("509757254862372883").send(message.author+"hat ein geblacklistetes Wort ("+words[j]+") geschriebenen \n Blacklist")
              return false;
            }
          }
        }
      });
}

exports.check_channel = (message) => {
  this.message = message;
  fs.readFile('./bannedwords/channelblacklist.txt',"utf8",(err, data) => {
    let channelid = data.split("|")
      for (i = 0; i < channelid.length; i++) {
        if (this.message.channel.id==channelid[i]) {
          message.client.channels.get("509757254862372883").send(message.author+"hat in einem geblacklisteten Channel ("+channelid[i]+") geschriebenen \n Blacklist")
          return false;
        }
      }



    });
}
