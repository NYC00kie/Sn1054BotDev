const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');

exports.add_role = (RoleData, message) => {
  this.message = message;
  const Author = this.message.author
  const Search = RoleData.Whirole
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
  if (Search=="memes"){
    if (docs.memes == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 50) {
      this.message.member.addRole("518395092197965845")
      this.message.author.send("Du hast die Rolle für: **50cxc** gekauft")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-50,memes:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n memes \n -50cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="stammgast"){
    if (docs.stammgast == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 5000) {
      this.message.author.send("Du hast die Rolle für: **5000cxc** gekauft")
      this.message.member.addRole("518395091472089101")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-5000,stammgast:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n stammgast \n -5000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="bohr") {
    if (docs.Bohr == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 8000) {
      this.message.author.send("Du hast die Rolle für: **8000cxc** gekauft")
      this.message.member.addRole("518384555007148042")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-8000,Bohr:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n bohr \n -8000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="curie"){
    if (docs.Curie == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 10000) {
      this.message.author.send("Du hast die Rolle für: **10000cxc** gekauft")
      this.message.member.addRole("518384549408014343")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-10000,Curie:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n curie \n -10000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="tesla"){
    if (docs.Tesla == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 13000) {
      this.message.author.send("Du hast die Rolle für: **13000cxc** gekauft")
      this.message.member.addRole("518384546492973056")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-13000,Tesla:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n tesla \n -13000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="newton"){
    if (docs.Newton == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 13000) {
      this.message.author.send("Du hast die Rolle für: **13000cxc** gekauft")
      this.message.member.addRole("518384356222566410")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-13000,Newton:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n newton \n -13000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="einstein"){
    if (docs.Einstein == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 21000) {
      this.message.author.send("Du hast die Rolle für: **21000cxc** gekauft")
      this.message.member.addRole("518384355698278430")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-21000,Einstein:1} })
      .exec()
      .then(docs => {
          message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n einstein \n -21000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="hawking"){
    if (docs.Hawking == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 21000) {
      this.message.author.send("Du hast die Rolle für: **21000cxc** gekauft")
      this.message.member.addRole("518384354880258049")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-21000,Hawking:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n hawking \n -21000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="musk"){
    if (docs.Musk == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 75000) {
      this.message.author.send("Du hast die Rolle für: **75000cxc** gekauft")
      this.message.member.addRole("518384354272215060")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-75000,Musk:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n musk \n -75000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="vip"){
    if (docs.Vip == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 82500) {
      this.message.author.send("Du hast die Rolle für: **82500cxc** gekauft")
      this.message.member.addRole("518384353387085845")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-82500,Vip:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n vip \n -82500cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search=="clixoomer"){
    if (docs.Clixoomer == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 100000) {
      this.message.author.send("Du hast die Rolle für: **100000cxc** gekauft")
      this.message.member.addRole("518384353387085845")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-100000,Clixoomer:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n clixoomer \n -100000cxc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug cxc")
}

  }
  else if (Search== undefined){
    console.log("something went wrong")
    this.message.channel.send("please define a Role you want to buy")
  }
})
}
