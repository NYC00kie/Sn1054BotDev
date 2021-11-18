const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Loghandler = require('./Loghandler');
const fs = require('fs');
dotenv.config();
exports.check_word = (message) => {
  this.message = message;
  let amount = false
  Splitmessage = this.message.content.split(" ")
  var data = fs.readFileSync('./bannedwords/blacklist.txt', "utf8")
  data = data.split("|")

  for (var i = 0; i < data.length; i++) {
    if (Splitmessage.find(element => element == data[i]) >= 0) {
      amount = true;
      break;
    }
  }

  return amount;
}

exports.check_channel = (message) => {
  this.message = message;

  var data = fs.readFileSync('./bannedwords/channelblacklist.txt', "utf8")
  if (data.includes(this.message.channel.id)) {
    return false;
  } else {
    return true
  }
}

exports.suizid = (message) => {
  this.message = message
  let content = this.message.content.toLowerCase()
  let badword = ["suizid", "selbstmord", "freitod", "selbsttötung", "selbstentleibung", "suicide"]
  let letter = content.split("")
  let triggered = false
  let szmessage = "Wir haben erkannt, dass du oder eine dir bekannte Person potentiell Selbstmordgedanken hat.\nWenn Du Selbstmordgedanken hast, gibt es Menschen, die dir in dieser Krise helfen können.\nDu solltest deshalb in jedem Fall sofort Kontakt zu entsprechenden medizinischen Diensten aufnehmen.\n\nSpeziell geschulte Menschen helfen Dir auch bei der TelefonSeelsorge unter den Nummern \n__DEU:__\n**0800 – 111 0 111** (TelefonSeelsorge® Deutschland)\n**0800 – 111 0 222** (TelefonSeelsorge® Deutschland)\n**116 111** (Nummer gegen Kummer)\n\n__AUT:__\n**142** (Telefonseelsorge Österreich) \n\n__CH:__\n**143** (Die Dargebotene Hand)\n\n**Es wird sich gleich ein Administrator unseres Servers an dich wenden.**"
  for (var i = 0; i < letter.length; i++) {

    var suizid = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5]
    var suicide = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5] + letter[i + 6]
    var selbstmord = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5] + letter[i + 6] + letter[i + 7] + letter[i + 8] + letter[i + 9]
    var freitod = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5] + letter[i + 6]
    var selbsttötung = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5] + letter[i + 6] + letter[i + 7] + letter[i + 8] + letter[i + 9] + letter[i + 10] + letter[i + 11]
    var selbstentleibung = letter[i] + letter[i + 1] + letter[i + 2] + letter[i + 3] + letter[i + 4] + letter[i + 5] + letter[i + 6] + letter[i + 7] + letter[i + 8] + letter[i + 9] + letter[i + 10] + letter[i + 11] + letter[i + 12] + letter[i + 13] + letter[i + 14] + letter[i + 15]


    for (var j = 0; j < badword.length; j++) {

      if (suizid == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;

        break;
      } else if (selbstmord == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;

        break;
      } else if (freitod == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;

        break;
      } else if (selbsttötung == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;
        break;
      } else if (selbstentleibung == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;

        break;
      } else if (suicide == badword[j]) {
        this.message.author.send(szmessage)
        this.message.client.channels.cache.get("506609726478483456").send(`Der User <@${this.message.author.id}> hat das Hilfesystem getriggert. \nEr braucht möglicherweise Hilfe.\nDer Person wurde eine Nachricht mit Hilfe Nummern geschrieben.  \nEs könnte möglicherweise praktisch sein, wenn jemand Privat Nachfragt und sich zum reden anbietet.`)
        triggered = true;

        break;
      }
    }
    if (triggered) {
      break;
    }
  }
}