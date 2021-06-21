const Discord = require('discord.js');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

exports.ping = (message,bot) => {
  this.message = message
  this.message.delete()
  message.channel.send("Es wird gepingt.")
  .then(m=> {
  var Pingembed = new Discord.MessageEmbed()
  .setColor(0xe19517)
  .setTitle("Ping Embed")
  .addField("aktueller Bot Ping:",`${ m.createdTimestamp-message.createdTimestamp}ms`)
  .addField("aktueller Api Ping:",`${bot.ws.ping}ms`)
  .addField("gesamter Ping ",`${ (m.createdTimestamp-message.createdTimestamp) + bot.ws.ping}ms`)

  m.edit("​").then(m.edit(Pingembed))

  })
}
