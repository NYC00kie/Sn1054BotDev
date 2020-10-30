const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const Sale = require('../models/sale');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

exports.nvctop = (message) => {
  this.message = message;
  const Searcharray = []
  const Personarray = []
  Sale.find()
  .exec()
  .then( docs => {
     docs.forEach((doc, idx, message) => {

        Searcharray.push(doc.cxc)
        Personarray.push("<@"+doc.MemberId+">")

    });
    var len = Searcharray.length//Search algorithm

    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
        if (Searcharray[j] < Searcharray[j+1]){
          var temp = Searcharray[j];
          Searcharray[j] = Searcharray[j+1];
          Searcharray[j+1] = temp;
          var temp = Personarray[j];
          Personarray[j] = Personarray[j+1];
          Personarray[j+1] = temp;
      }
    }
  }
//hier den Code zur benutztung des Sortierten Array
var TopEmbed = new Discord.MessageEmbed()
  .setColor(0xe19517)
  .setTitle("Die 10 Leute mit den meisten nvc")
  .addField("឵឵ ឵឵ ឵឵","1. "+ Personarray[0]+" mit "+Searcharray[0]+"\n\n2. "+ Personarray[1]+" mit "+Searcharray[1]+"\n\n3. "+ Personarray[2]+" mit "+Searcharray[2]+"\n\n4. "+ Personarray[3]+" mit "+Searcharray[3]+"\n\n5. "+ Personarray[4]+" mit "+Searcharray[4]+"\n\n6. "+ Personarray[5]+" mit "+Searcharray[5]+"\n\n7. "+ Personarray[6]+" mit "+Searcharray[6]+"\n\n8. "+ Personarray[7]+" mit "+Searcharray[7]+"\n\n9. "+ Personarray[8]+" mit "+Searcharray[8]+"\n\n10. "+ Personarray[9]+" mit "+Searcharray[9])
  .setFooter("Heute ist der: "+Date("now"))
  this.message.channel.send(TopEmbed)

    })
}
exports.pwtop = (message) => {
  this.message = message;
  const Searcharray = []
  const Personarray = []
  Sale.find()
  .exec()
  .then( docs => {
     docs.forEach((doc, idx, message) => {

        Searcharray.push(doc.Prestiege)
        Personarray.push(doc.Nickname)

    });
    var len = Searcharray.length//Search algorithm

    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
        if (Searcharray[j] < Searcharray[j+1]){
          var temp = Searcharray[j];
          Searcharray[j] = Searcharray[j+1];
          Searcharray[j+1] = temp;
          var temp = Personarray[j];
          Personarray[j] = Personarray[j+1];
          Personarray[j+1] = temp;
      }
    }
  }
//hier den Code zur benutztung des Sortierten Array
var TopEmbed = new Discord.MessageEmbed()
  .setColor(0xe19517)
  .setTitle("Die 10 Leute mit dem meisten Prestiegewert")
  .addField("឵឵ ឵឵ ឵឵","1. "+ Personarray[0]+" mit "+Searcharray[0]+"\n\n2. "+ Personarray[1]+" mit "+Searcharray[1]+"\n\n3. "+ Personarray[2]+" mit "+Searcharray[2]+"\n\n4. "+ Personarray[3]+" mit "+Searcharray[3]+"\n\n5. "+ Personarray[4]+" mit "+Searcharray[4]+"\n\n6. "+ Personarray[5]+" mit "+Searcharray[5]+"\n\n7. "+ Personarray[6]+" mit "+Searcharray[6]+"\n\n8. "+ Personarray[7]+" mit "+Searcharray[7]+"\n\n9. "+ Personarray[8]+" mit "+Searcharray[8]+"\n\n10. "+ Personarray[9]+" mit "+Searcharray[9])
  .setFooter("Heute ist der: "+Date("now"))
  this.message.channel.send(TopEmbed)
    })
}


exports.messagetop = (message) => {
  this.message = message;
  const Searcharray = []
  const Personarray = []
  Sale.find()
  .exec()
  .then( docs => {
     docs.forEach((doc, idx, message) => {

        Searcharray.push(doc.messages)
        Personarray.push(doc.Nickname)

    });
    var len = Searcharray.length//Search algorithm

    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
        if (Searcharray[j] < Searcharray[j+1]){
          var temp = Searcharray[j];
          Searcharray[j] = Searcharray[j+1];
          Searcharray[j+1] = temp;
          var temp = Personarray[j];
          Personarray[j] = Personarray[j+1];
          Personarray[j+1] = temp;
      }
    }
  }
//hier den Code zur benutztung des Sortierten Array
var TopEmbed = new Discord.MessageEmbed()
  .setColor(0xe19517)
  .setTitle("Die 10 Leute mit den meisten Nachrichten")
  .addField("឵឵ ឵឵ ឵឵","1. "+ Personarray[0]+" mit "+Searcharray[0]+"\n\n2. "+ Personarray[1]+" mit "+Searcharray[1]+"\n\n3. "+ Personarray[2]+" mit "+Searcharray[2]+"\n\n4. "+ Personarray[3]+" mit "+Searcharray[3]+"\n\n5. "+ Personarray[4]+" mit "+Searcharray[4]+"\n\n6. "+ Personarray[5]+" mit "+Searcharray[5]+"\n\n7. "+ Personarray[6]+" mit "+Searcharray[6]+"\n\n8. "+ Personarray[7]+" mit "+Searcharray[7]+"\n\n9. "+ Personarray[8]+" mit "+Searcharray[8]+"\n\n10. "+ Personarray[9]+" mit "+Searcharray[9])
  .setFooter("Heute ist der: "+Date("now"))
  this.message.channel.send(TopEmbed)
    })
}
