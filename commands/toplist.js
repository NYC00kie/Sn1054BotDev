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
exports.channeltop = async (message) => {
  this.message = message;
  this.message.channel.send("Loading Data")
  let channelarr = []
  Sale.find()
  .exec()
  .then( async (docs) => {
    docs.forEach((doc, idx, message) => {
      if (doc.Channelid!="undefined"){
        channelarr.push({Memid:doc.MemberId,Chaid:doc.Channelid})
      }
      if (doc.Channelid2!="undefined") {
        channelarr.push({Memid:doc.MemberId,Chaid:doc.Channelid2})
      }
    });
    console.log(channelarr)
    for (var i = 0; i < channelarr.length; i++) {
      let msgcount1 = await lots_of_messages_getter(message.client.channels.cache.get(channelarr[i].Chaid))
      let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
      channelarr[i].messages = msgcount2
      console.log(channelarr)
    }
    channelarr.sort(function(a, b) {
    return b.messages - a.messages;
  });
  console.log(channelarr)
  var TopEmbed = new Discord.MessageEmbed()
    .setColor(0xe19517)
    .setTitle("Die (bis zu) 10 Leute mit den best laufenden Channel(s)")
    .setFooter("Heute ist der: "+Date("now"))
  for (var i = 0; i < channelarr.length; i++) {
    if (i>=10) {break;}
    TopEmbed.addField("឵឵ ឵឵ ឵឵",""+i+". <#"+ channelarr[i].Chaid+"> von <@"+channelarr[i].Memid+"> mit "+channelarr[i].messages+"Nachrichten")
  }
  this.message.channel.send(TopEmbed)
  }).catch(err => {//message fuction
    var e = new Error(err);
    const Es = e.toString()
    var mailOptions = {
      from: process.env.Mailadress,
      to: process.env.MyMailadress,
      subject: "Error",
      text: Es + Date("now")
    };
    transporter.sendMail(mailOptions);
    console.error(err);
    });
}


async function lots_of_messages_getter(channel, limitt = 10000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 99 };
    if (last_id) {
    options.before = last_id;
    }

    const messages = await channel.messages.fetch(options);
    sum_messages.push(messages.size);
    last_id = messages.last().id;

    if (messages.size != 99 || sum_messages >= limitt) {
      break;
    }
}

return sum_messages;
}

async function how_many_messages_are_there_actually(msgcount){
  let PreActuall_messages_v0 = msgcount.toString();
  let Actuall_messages_v0 = PreActuall_messages_v0.split(",");
  let y = Actuall_messages_v0.length

  var count = 0
  for (i = 0; i < y; i++) {
    var count = count + parseInt(Actuall_messages_v0[i])
  }
  actuall_messages = count
  return actuall_messages
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
