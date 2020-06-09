const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');

exports.remove_role = (RoleData, message) => {
  this.message = message;
  const Author = this.message.author
  const Search = RoleData.Whirole
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
    if (Search=="memes"){
      if (docs.memes == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518395092197965845")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+45,memes:0} })
    .exec()
    .then(docs => {
      message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n memes \n +45cxc")
    })
  }

    }
    else if (Search=="stammgast"){
      if (docs.stammgast == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518395091472089101")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+4750,stammgast:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n stammgast \n +4750cxc")
    })
  }

    }
    else if (Search=="bohr") {
      if (docs.Bohr == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384555007148042")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+7600,Bohr:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n bohr \n +7600cxc")
    })
  }

    }
    else if (Search=="curie"){
      if (docs.Curie == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384549408014343")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+9500,Curie:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n curie \n +9500cxc")
    })
  }

    }
    else if (Search=="tesla"){
      if (docs.Tesla == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384546492973056")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+12350,Tesla:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n tesla \n +12350cxc")
    })
  }

    }
    else if (Search=="newton"){
      if (docs.Newton == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384356222566410")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+12350,Newton:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n newton \n +12350cxc")
    })
  }

    }
    else if (Search=="einstein"){
      if (docs.Einstein == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384355698278430")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+19950,Einstein:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n einstein \n +19950cxc")
    })
  }

    }
    else if (Search=="hawking"){
      if (docs.Hawking == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384354880258049")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+19950,Hawking:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n hawking \n +19950cxc")
    })
  }

    }
    else if (Search=="musk"){
      if (docs.Musk == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384354272215060")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+71250,Musk:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n musk \n +71250cxc")
    })
  }

    }
    else if (Search=="vip"){
      if (docs.Vip == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384353387085845")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+78375,Vip:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n vip \n +78375cxc")
    })
  }

    }
    else if (Search=="clixoomer"){
      if (docs.Clixoomer == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518172524811386890")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+95000,Clixoomer:0} })
    .exec()
    .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle verkauft:\n clixoomer \n +95000cxc")
    })
  }

    }
    else if (Search== "all"){
      if (docs.memes == 1){
        var cxc = 45
      }
      if (docs.stammgast == 1){
        var cxc=cxc + 4750
      }
      if (docs.Bohr == 1){
        var cxc=cxc + 7600
      }
      if (docs.Curie == 1){
        var cxc=cxc + 9500
      }
      if (docs.Tesla == 1){
        var cxc=cxc + 12350
      }
      if (docs.Newton == 1){
        var cxc=cxc + 12350
      }
      if (docs.Einstein == 1){
        var cxc=cxc + 19950
      }
      if (docs.Hawking == 1){
        var cxc=cxc + 19950
      }
      if (docs.Musk == 1){
        var cxc=cxc + 71250
      }
      if (docs.Vip == 1){
        var cxc=cxc + 78375
      }
      if (docs.Clixoomer == 1){
        var cxc=cxc + 95000
      }
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+cxc,memes:0,stammgast:0,Bohr:0,Curie:0,Tesla:0,Newton:0,Einstein:0,Hawking:0,Musk:0,Vip:0,Clixoomer:0} })
      .exec()
      .then(docs => {
        this.message.member.removeRole("518395092197965845")
        this.message.member.removeRole("518395091472089101")
        this.message.member.removeRole("518384555007148042")
        this.message.member.removeRole("518384549408014343")
        this.message.member.removeRole("518384546492973056")
        this.message.member.removeRole("518384356222566410")
        this.message.member.removeRole("518384355698278430")
        this.message.member.removeRole("518384354880258049")
        this.message.member.removeRole("518172524811386890")
        this.message.member.removeRole("518384353387085845")
        this.message.member.removeRole("518384354272215060")
        this.message.channel.send("alle dein Rollen wurden verkauft")
        this.message.author.send("Alle deine Rollen wurden verkauft und es wird keine Rückerstattung geben.")
        message.client.channels.get("509757254862372883").send(message.author+":\n alle Rollen verkauft.\n +"+cxc)
      }).catch(console.error)
    }
    else if (Search== undefined){
      console.log("something went wrong")
      this.message.channel.send("bitte definiere eine Rolle , die du verkaufen möchtes.")
    }

  })
}
