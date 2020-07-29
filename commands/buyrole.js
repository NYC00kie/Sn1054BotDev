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
      this.message.author.send("Du hast die Rolle für: **50nvc** gekauft")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-50,memes:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n memes \n -50nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="gaswolke"){
    if (docs.stammgast == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 5000) {
      this.message.author.send("Du hast die Rolle für: **3750nvc** gekauft")
      this.message.member.addRole("518395091472089101")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-3750,stammgast:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n gaswolke \n -3750nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="brauner-zwerg") {
    if (docs.Bohr == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 6000) {
      this.message.author.send("Du hast die Rolle für: **6000nvc** gekauft")
      this.message.member.addRole("518384555007148042")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-6000,Bohr:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n brauner-zwerg \n -6000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="roter-zwerg"){
    if (docs.Curie == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 7500) {
      this.message.author.send("Du hast die Rolle für: **7500nvc** gekauft")
      this.message.member.addRole("518384549408014343")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-7500,Curie:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n roter-zwerg \n -7500nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="weißer-zwerg"){
    if (docs.Tesla == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 13000) {
      this.message.author.send("Du hast die Rolle für: **13000nvc** gekauft")
      this.message.member.addRole("518384546492973056")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-13000,Tesla:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n weißer-zwerg \n -13000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="hauptreihenstern"){
    if (docs.Newton == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 20000) {
      this.message.author.send("Du hast die Rolle für: **20000nvc** gekauft")
      this.message.member.addRole("518384356222566410")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-20000,Newton:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n hauptreihenstern \n -20000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="roter-riese"){
    if (docs.Einstein == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 25000) {
      this.message.author.send("Du hast die Rolle für: **25000nvc** gekauft")
      this.message.member.addRole("518384355698278430")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-25000,Einstein:1} })
      .exec()
      .then(docs => {
          message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n roter riese \n -25000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="supernova"){
    if (docs.Hawking == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 50000) {
      this.message.author.send("Du hast die Rolle für: **50000nvc** gekauft")
      this.message.member.addRole("518384354880258049")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-50000,Hawking:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n supernova \n -50000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="neutronen-stern"){
    if (docs.Musk == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 75000) {
      this.message.author.send("Du hast die Rolle für: **75000nvc** gekauft")
      this.message.member.addRole("518384354272215060")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-75000,Musk:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n neutronen-stern \n -75000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="schwarzes-loch"){
    if (docs.Vip == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 80000) {
      this.message.author.send("Du hast die Rolle für: **80000nvc** gekauft")
      this.message.member.addRole("518384353387085845")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-80000,Vip:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n schwarzes-loch \n -80000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="pulsar"){
    if (docs.Clixoomer == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 95000) {
      this.message.author.send("Du hast die Rolle für: **95000nvc** gekauft")
      this.message.member.addRole("518172524811386890")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-95000,Clixoomer:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n pulsar \n -95000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search=="quasar"){
    if (docs.quasar == 1){
      this.message.channel.send("Du hast diese Rolle schon")
    }
    else if (docs.cxc >= 115000) {
      this.message.author.send("Du hast die Rolle für: **115000nvc** gekauft")
      this.message.member.addRole("700740599195893760")
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-115000,Quasar:1} })
      .exec()
      .then(docs => {
        message.client.channels.get("509757254862372883").send(message.author+":\n Rolle gekauft:\n quasar \n -115000nvc")
      })
    }
    else {
  this.message.channel.send("Du hast nicht genug nvc")
}

  }
  else if (Search== undefined){
    console.log("something went wrong")
    this.message.channel.send("please define a Role you want to buy")
  }
})
}
