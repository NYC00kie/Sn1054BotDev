const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');

exports.change_nick = (NewNick, message) => {
  this.message = message;
  const Author = this.message.author
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
    if (NewNick.Nick == undefined){
      this.message.channel.send("bitte deffiniere einen Nickname")
    }
    if (docs.cxc > 400) {
    this.message.member.setNickname(NewNick.Nick,"Command from the User")
    .catch(console.error)
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-400,Nickname:NewNick.Nick} })
    .exec()
    .then(docs => {
      Author.send("Dein Nickname wurde zu "+NewNick.Nick+" geändert")
      message.client.channels.get("509757254862372883").send(message.author+":\n Changed Nick \n -40nvc")
    })
  }
  else {
    Author.send("du hast nicht genug cxc")
  }
  })

}
