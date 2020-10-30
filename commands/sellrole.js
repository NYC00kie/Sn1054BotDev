const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const Loghandler = require('./Loghandler');

exports.remove_role = (RoleData, message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  const Search = RoleData.Whirole
  Sale.findOne({MemberId:MemberID})
  .exec()
  .then(docs => {

    if (Search=="gaswolke"){
      if (docs.stammgast == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518395091472089101")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+3750,stammgast:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518395091472089101",undefined)
    })
  }

    }
    else if (Search=="brauner-zwerg") {
      if (docs.Bohr == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384555007148042")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+6000,Bohr:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384555007148042",undefined)
    })
  }

    }
    else if (Search=="roter-zwerg"){
      if (docs.Curie == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384549408014343")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+7500,Curie:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384549408014343",undefined)
    })
  }

    }
    else if (Search=="weißer-zwerg"){
      if (docs.Tesla == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384546492973056")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+13000,Tesla:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384546492973056",undefined)
    })
  }

    }
    else if (Search=="hauptreihenstern"){
      if (docs.Newton == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384356222566410")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+20000,Newton:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384356222566410",undefined)
    })
  }

    }
    else if (Search=="roter-riese"){
      if (docs.Einstein == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384355698278430")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+25000 ,Einstein:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384355698278430",undefined)
    })
  }

    }
    else if (Search=="supernova"){
      if (docs.Hawking == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384354880258049")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+50000,Hawking:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384354880258049",undefined)
    })
  }

    }
    else if (Search=="neutronen-stern"){
      if (docs.Musk == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384354272215060")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+75000,Musk:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384354272215060",undefined)
    })
  }

    }
    else if (Search=="schwarzes-loch"){
      if (docs.Vip == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518384353387085845")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+80000,Vip:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518384353387085845",undefined)
    })
  }

    }
    else if (Search=="pulsar"){
      if (docs.Clixoomer == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("518172524811386890")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+95000,Clixoomer:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","518172524811386890",undefined)
    })
  }

    }
    else if (Search=="quasar"){
      if (docs.Clixoomer == 0){
        this.message.channel.send("Du hast diese Rolle noch nicht.")
      }
      else {
    this.message.member.removeRole("700740599195893760")
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+115000,quasar:0} })
    .exec()
    .then(docs => {
        Loghandler.log(message,Author,undefined,"sellrole","700740599195893760",undefined)
    })
  }

    }
    else if (Search== "all"){
      if (docs.stammgast == 1){
        var cxc=cxc + 3750
      }
      if (docs.Bohr == 1){
        var cxc=cxc + 6000
      }
      if (docs.Curie == 1){
        var cxc=cxc + 7500
      }
      if (docs.Tesla == 1){
        var cxc=cxc + 13000
      }
      if (docs.Newton == 1){
        var cxc=cxc + 20000
      }
      if (docs.Einstein == 1){
        var cxc=cxc + 25000
      }
      if (docs.Hawking == 1){
        var cxc=cxc + 50000
      }
      if (docs.Musk == 1){
        var cxc=cxc + 75000
      }
      if (docs.Vip == 1){
        var cxc=cxc + 80000
      }
      if (docs.Clixoomer == 1){
        var cxc=cxc + 95000
      }
      if (docs.quasar == 1){
        var cxc=cxc + 115000
      }
      Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+cxc,memes:0,stammgast:0,Bohr:0,Curie:0,Tesla:0,Newton:0,Einstein:0,Hawking:0,Musk:0,Vip:0,Clixoomer:0,quasar:0} })
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
        this.message.member.removeRole("700740599195893760")
        this.message.channel.send("alle dein Rollen wurden verkauft")
        this.message.author.send("Alle deine Rollen wurden verkauft und es wird keine Rückerstattung geben.")
        Loghandler.log(message,Author,undefined,"sellroleall",undefined,undefined)
      }).catch(console.error)
    }
    else if (Search== undefined){
      console.log("something went wrong")
      this.message.channel.send("bitte definiere eine Rolle , die du verkaufen möchtes.")
    }

  })
}
