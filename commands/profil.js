const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');

exports.get_profil = (PingData,message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  if (!PingData.Ping) {
    Sale.findOne({MemberId:MemberID})
    .exec()
    .then(docs => {
        //All of this if else things are just to Test if there are Any roles
        if (docs.memes==0){
          var Memes = "."
        }
        else {
          var Memes = "memes"
        }
        if (docs.stammgast==0){
          var stammgast = "."
        }
        else {
          var stammgast = "gaswolke"
        }
        if (docs.Bohr==0){
          var Bohr = "."
        }
        else {
          var Bohr = "brauner-zwerg"
        }
        if (docs.Curie==0){
          var Curie = "."
        }
        else {
          var Curie = "roter-zwerg"
        }
        if (docs.Tesla==0){
          var Tesla = "."
        }
        else {
          var Tesla = "weißer-zwerg"
        }
        if (docs.Newton==0){
          var Newton = "."
        }
        else {
          var Newton = "hauptreihenstern"
        }
        if (docs.Einstein==0){
          var Einstein = "."
        }
        else {
          var Einstein = "roter-riese"
        }
        if (docs.Hawking==0){
          var Hawking = "."
        }
        else {
          var Hawking = "supernova"
        }
        if (docs.Musk==0){
          var Musk = "."
        }
        else {
          var Musk = "neutronen-stern"
        }
        if (docs.Vip==0){
          var Vip = "."
        }
        else {
          var Vip = "schwarzes-loch"
        }
        if (docs.Clixoomer==0){
          var Clixoomer = "."
        }
        else {
          var Clixoomer = "pulsar"
        }
        if (docs.quasar==0){
          var quasar = "."
        }
        else {
          var quasar = "quasar"
        }
        if (docs.Channelid == "undefined"){
          var Channel = "kein Channel"
        }
        else {
          var Channel = "<#"+docs.Channelid+">"
        }

        var Footertext = "Server beigetreten:" + new Date(this.message.member.joinedTimestamp)+" "
        var Profilembed = new Discord.RichEmbed()
        .setColor(0xe19517)
        .setTitle(docs.Nickname+"´s Profile:")
        .setThumbnail(message.author.avatarURL)
        .addField("Dein Prestiegewert:",docs.Prestiege)
        .addField("Deine nvc:",docs.cxc)
        .addField("Deine Rollen:"," "+Memes+"\n "+stammgast+"\n "+Bohr+"\n "+Curie+"\n "+Tesla+"\n "+Newton+"\n "+Einstein+"\n "+Hawking+"\n "+Musk+"\n "+Vip+"\n "+Clixoomer+"\n "+quasar)
        .addField("Deine geschriebenen Nachrichten:",docs.messages)
        .addField("Dein aktueller Kanal: ",Channel)
        .addField("Dann wurde deine letzte daily abgeholt:",docs.lastdaily)
        .setFooter(Footertext)
        //check if the message author is the same as the author from the docs

        if (PingData.Ping == docs.Name) {
          this.message.channel.send(Profilembed);
          return;
        }
        else if (PingData.Ping) {
          return;
        }
        else if (this.message.author == docs.Name){
              this.message.channel.send(Profilembed);
              return;

        }
        else {
          return;
        }
    })
    .catch(console.error)
    return;
  }
  else {
    Sale.findOne({Name2:PingData.Ping})
    .exec()
    .then(docs => {
        //All of this if else things are just to Test if there are Any roles
        if (docs.memes==0){
          var Memes = "."
        }
        else {
          var Memes = "memes"
        }
        if (docs.stammgast==0){
          var stammgast = "."
        }
        else {
          var stammgast = "gaswolke"
        }
        if (docs.Bohr==0){
          var Bohr = "."
        }
        else {
          var Bohr = "brauner-zwerg"
        }
        if (docs.Curie==0){
          var Curie = "."
        }
        else {
          var Curie = "roter-zwerg"
        }
        if (docs.Tesla==0){
          var Tesla = "."
        }
        else {
          var Tesla = "weißer-zwerg"
        }
        if (docs.Newton==0){
          var Newton = "."
        }
        else {
          var Newton = "hauptreihenstern"
        }
        if (docs.Einstein==0){
          var Einstein = "."
        }
        else {
          var Einstein = "roter-riese"
        }
        if (docs.Hawking==0){
          var Hawking = "."
        }
        else {
          var Hawking = "supernova"
        }
        if (docs.Musk==0){
          var Musk = "."
        }
        else {
          var Musk = "neutronen-stern"
        }
        if (docs.Vip==0){
          var Vip = "."
        }
        else {
          var Vip = "schwarzes-loch"
        }
        if (docs.Clixoomer==0){
          var Clixoomer = "."
        }
        else {
          var Clixoomer = "pulsar"
        }
        if (docs.quasar==0){
          var quasar = "."
        }
        else {
          var quasar = "quasar"
        }
        if (docs.Channelid == "undefined"){
          var Channel = "kein Channel"
        }
        else {
          var Channel = "<#"+docs.Channelid+">"
        }
        var UserID = message.guild.members.find(m => m.id === docs.MemberId);
        var Footertext = "Server beigetreten:" + new Date(UserID.joinedTimestamp)+" "
        var Profilembed = new Discord.RichEmbed()
        .setColor(0xe19517)
        .setTitle(docs.Nickname+"´s Profile:")
        .setThumbnail(docs.Name.avatarURL)
        .addField("Dein Prestiegewert:",docs.Prestiege)
        .addField("Deine nvc:",docs.cxc)
        .addField("Deine Rollen:"," "+Memes+"\n "+stammgast+"\n "+Bohr+"\n "+Curie+"\n "+Tesla+"\n "+Newton+"\n "+Einstein+"\n "+Hawking+"\n "+Musk+"\n "+Vip+"\n "+Clixoomer+"\n "+quasar)
        .addField("Deine geschriebenen Nachrichten:",docs.messages)
        .addField("Dein aktueller Kanal: ",Channel)
        .addField("Dann wurde deine letzte daily abgeholt:",docs.lastdaily)
        .setFooter(Footertext)
        //check if the message author is the same as the author from the docs

              this.message.channel.send(Profilembed);

    })
    .catch(err => {
      Sale.findOne({Name:PingData.Ping})
      .exec()
      .then(docs => {
          //All of this if else things are just to Test if there are Any roles
          if (docs.memes==0){
            var Memes = "."
          }
          else {
            var Memes = "memes"
          }
          if (docs.stammgast==0){
            var stammgast = "."
          }
          else {
            var stammgast = "gaswolke"
          }
          if (docs.Bohr==0){
            var Bohr = "."
          }
          else {
            var Bohr = "brauner-zwerg"
          }
          if (docs.Curie==0){
            var Curie = "."
          }
          else {
            var Curie = "roter-zwerg"
          }
          if (docs.Tesla==0){
            var Tesla = "."
          }
          else {
            var Tesla = "weißer-zwerg"
          }
          if (docs.Newton==0){
            var Newton = "."
          }
          else {
            var Newton = "hauptreihenstern"
          }
          if (docs.Einstein==0){
            var Einstein = "."
          }
          else {
            var Einstein = "roter-riese"
          }
          if (docs.Hawking==0){
            var Hawking = "."
          }
          else {
            var Hawking = "supernova"
          }
          if (docs.Musk==0){
            var Musk = "."
          }
          else {
            var Musk = "neutronen-stern"
          }
          if (docs.Vip==0){
            var Vip = "."
          }
          else {
            var Vip = "schwarzes-loch"
          }
          if (docs.Clixoomer==0){
            var Clixoomer = "."
          }
          else {
            var Clixoomer = "pulsar"
          }
          if (docs.quasar==0){
            var quasar = "."
          }
          else {
            var quasar = "quasar"
          }
          if (docs.Channelid == "undefined"){
            var Channel = "kein Channel"
          }
          else {
            var Channel = "<#"+docs.Channelid+">"
          }
          var UserID = message.guild.members.find(m => m.id === docs.MemberId);
          var Footertext = "Server beigetreten:" + new Date(UserID.joinedTimestamp)+" "
          var Profilembed = new Discord.RichEmbed()
          .setColor(0xe19517)
          .setTitle(docs.Nickname+"´s Profile:")
          .setThumbnail(docs.Name.avatarURL)
          .addField("Dein Prestiegewert:",docs.Prestiege)
          .addField("Deine nvc:",docs.cxc)
          .addField("Deine Rollen:"," "+Memes+"\n "+stammgast+"\n "+Bohr+"\n "+Curie+"\n "+Tesla+"\n "+Newton+"\n "+Einstein+"\n "+Hawking+"\n "+Musk+"\n "+Vip+"\n "+Clixoomer+"\n "+quasar)
          .addField("Deine geschriebenen Nachrichten:",docs.messages)
          .addField("Dein aktueller Kanal: ",Channel)
          .addField("Dann wurde deine letzte daily abgeholt:",docs.lastdaily)
          .setFooter(Footertext)
          //check if the message author is the same as the author from the docs

                this.message.channel.send(Profilembed);

      })
    })
    return;
  }

}
