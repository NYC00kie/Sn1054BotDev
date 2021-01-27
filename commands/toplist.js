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
  let channelarr = []
  Sale.find()
  .exec()
  .then(docs => {
    docs.forEach((doc, idx, message) => {
      if (doc.Channelid!="undefined"){
        channelarr.push({Memid:doc.MemberId,Chaid:doc.Channelid})
      }
      if (doc.Channelid2!="undefined") {
        channelarr.push({Memid:doc.MemberId,Chaid:doc.Channelid})
      }
    });
  })
  for (var i = 0; i < channelarr.length; i++) {
    await sleep(1000)
    let msgcount1 = await lots_of_messages_getter(message.client.channels.cache.get(channelarr[i].Chaid))
    let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
    let channelarr[i].messages = msgcount2
  }
  channelarr.sort(function(a, b) {
  return a.messages - b.messages;
});
var TopEmbed = new Discord.MessageEmbed()
  .setColor(0xe19517)
  .setTitle("Die 10 Leute mit den meisten nvc")
  .addField("឵឵ ឵឵ ឵឵","1. <#"+ channelarr[0].Chaid+"> von <@"+channelarr[0].Memid+"> mit "+channelarr[0].messages+"Nachrichten\n\n2. <#"+ channelarr[1].Chaid+"> von <@"+channelarr[1].Memid+"> mit "+channelarr[1].messages+"Nachrichten\n\n3. <#"+ channelarr[2].Chaid+"> von <@"+channelarr[2].Memid+"> mit "+channelarr[2].messages+"Nachrichten\n\n4. <#"+ channelarr[3].Chaid+"> von <@"+channelarr[3].Memid+"> mit "+channelarr[3].messages+"Nachrichten\n\n5. <#"+ channelarr[4].Chaid+"> von <@"+channelarr[4].Memid+"> mit "+channelarr[4].messages+"Nachrichten\n\n6. <#"+ channelarr[5].Chaid+"> von <@"+channelarr[5].Memid+"> mit "+channelarr[5].messages+"Nachrichten\n\n7. <#"+ channelarr[6].Chaid+"> von <@"+channelarr[6].Memid+"> mit "+channelarr[6].messages+"Nachrichten\n\n8. <#"+ channelarr[7].Chaid+"> von <@"+channelarr[7].Memid+"> mit "+channelarr[7].messages+"Nachrichten\n\n9. <#"+ channelarr[8].Chaid+"> von <@"+channelarr[8].Memid+"> mit "+channelarr[8].messages+"Nachrichten\n\n10. <#"+ channelarr[9].Chaid+"> von <@"+channelarr[9].Memid+"> mit "+channelarr[9].messages+"Nachrichten")
  .setFooter("Heute ist der: "+Date("now"))
  this.message.channel.send(TopEmbed)
  return;
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
