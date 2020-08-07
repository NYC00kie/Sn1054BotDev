const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const stringsimilarity = require('string-similarity');
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
            if (j == words.length-1 ) {
              return true;
            }
          }
        }
}

exports.check_channel =  (message) => {
  this.message = message;

  var data = fs.readFileSync('./bannedwords/channelblacklist.txt',"utf8")
    let channelid = data.split("|")
      for (i = 0; i < channelid.length; i++) {
        if (this.message.channel.id==channelid[i]) {
          return false;
        }
        if (i == channelid.length-1) {
          return true;
        }
      }

}

exports.suizid = (message) => {
  this.message = message
  let content = this.message.content.toLowerCase()
  let badword = ["suizid","selbstmord","freitod","selbsttötung","selbstentleibung"]
  let letter = content.split("")

  for (var i = 0; i < letter.length; i++) {

    var suizid = letter[i]+letter[i+1]+letter[i+2]+letter[i+3]+letter[i+4]+letter[i+5]
    var selbstmord = letter[i]+letter[i+1]+letter[i+2]+letter[i+3]+letter[i+4]+letter[i+5]+letter[i+6]+letter[i+7]+letter[i+8]+letter[i+9]
    var freitod =letter[i]+letter[i+1]+letter[i+2]+letter[i+3]+letter[i+4]+letter[i+5]+letter[i+6]
    var selbsttötung = letter[i]+letter[i+1]+letter[i+2]+letter[i+3]+letter[i+4]+letter[i+5]+letter[i+6]+letter[i+7]+letter[i+8]+letter[i+9]+letter[i+10]+letter[i+11]
    var selbstentleibung = letter[i]+letter[i+1]+letter[i+2]+letter[i+3]+letter[i+4]+letter[i+5]+letter[i+6]+letter[i+7]+letter[i+8]+letter[i+9]+letter[i+10]+letter[i+11]+letter[i+12]+letter[i+13]+letter[i+14]+letter[i+15]


    for (var j = 0; j < badword.length; j++) {
      var Wert1 = stringsimilarity.compareTwoStrings(suizid,badword[j])
      var Wert2 = stringsimilarity.compareTwoStrings(selbstmord,badword[j])
      var Wert3 = stringsimilarity.compareTwoStrings(freitod,badword[j])
      var Wert4 = stringsimilarity.compareTwoStrings(selbsttötung,badword[j])
      var Wert5 = stringsimilarity.compareTwoStrings(selbstentleibung,badword[j])

      if (suizid==badword[j]) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern **0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      else if (selbstmord==badword[j]) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern **0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      else if (freitod==badword[j]) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern **0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      else if (selbsttötung==badword[j]) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern **0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
       }
      else if (selbstentleibung==badword[j]) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern **0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      if (Wert1>=0.44) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n**0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      if (Wert2>=0.44) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n**0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      if (Wert3>=0.44) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n**0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      if (Wert4>=0.44) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n**0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
      if (Wert5>=0.44) {
        this.message.channel.send("Wir haben erkannt, dass du potentiell Selbstmordgedanken hast.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n**0800 – 111 0 111** \n**0800 – 111 0 222**\n**116 111** ")
        break;
      }
    }
  }
}
