const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

async function lots_of_messages_getter(channel, limit = 10000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
    options.before = last_id;
  }

  const messages = await channel.fetchMessages(options);
  sum_messages.push(messages.size);
  last_id = messages.last().id;

    if (messages.size != 100 || sum_messages >= limit) {
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
  for (i=0; i< y; i++) {
    var count = count + parseInt(Actuall_messages_v0[i])
  }
  actuall_messages = count
  return actuall_messages
}

exports.create_channel = (ChannelData,message) => {
  this.message = message;
  const Author = this.message.author
  this.message.client.channels.get("509757254862372883").send(ChannelData.name+" wurde für "+this.message.author+" erstellt.")
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
  if (docs.Channelid == "undefined"){//testen , ob der User bereits einen Channel hat
  message.delete(1000)
  this.message.member.guild.createChannel(ChannelData.name, "text")//Channel erstellen
  .then(newchannel => {
    var channelidid = newchannel.id
    message.client.channels.get(channelidid).setTopic(ChannelData.beschreibung+" | "+this.message.author)//beschreibung eingeben
    .then(() => {message.client.channels.get(channelidid).setParent("451776378938064897")//in die Richtige Kategorie verschieben
    .then(() => {
      message.client.channels.get(channelidid).lockPermissions()//Permissions syncen
      })
    })
      .catch(console.error);
    message.client.channels.get(channelidid).send(this.message.author+" dein Channel wurde erstellt")
      Sale.updateOne({ _id: docs.id }, { $set: { Channelid: channelidid ,createdDate: Date("now")} })//update Channel in DB
      .exec()
      .then(docs =>{
      })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
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
else {
  this.message.channel.send("Es ist ein Fehleraufgetreten. Warscheinlich hast du schon einen Kanal")
}
}).catch(err => {
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
exports.chstats_channel_User = (message,PingData) => {
  this.message = message;
  const Author = this.message.author
  if (PingData.Ping == undefined) {
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
    var channel = docs.Channelid
    if (channel != "undefined"){
        message.delete(1000)
        .then(async () => {
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
          var ChstatsEmbed = new Discord.RichEmbed()
            .setColor(0xe19517)
            .setTitle("Deine Kanal-Stats")
            .addField("Stats:","Dein Channel:\n"+"<#"+channel+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Cxc:\n"+msgcount2*2+"\n")
            .setTimestamp(Date("now"))
          this.message.channel.send(ChstatsEmbed);

        }).catch(console.error);
    }
    else {
      this.message.channel.send("Du hast keinen Kanal")
    }
  })
  }
  else {
    Sale.findOne({Name:PingData.Ping})
    .exec()
    .then(docs => {
      var channel = docs.Channelid
      if (channel != "undefined"){
          message.delete(1000)
          .then(async () => {
            let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
            let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
            var ChstatsEmbed = new Discord.RichEmbed()
              .setColor(0xe19517)
              .setTitle("Deine Kanal-Stats")
              .addField("Stats:","Dein Channel:\n"+"<#"+channel+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Cxc:\n"+msgcount2*2+"\n")
              .setTimestamp(Date("now"))
            this.message.channel.send(ChstatsEmbed);
          })
        }
    }).catch(err => {
      Sale.findOne({Name2:PingData.Ping})
      .exec()
      .then(docs => {
        var channel = docs.Channelid
        if (channel != "undefined"){
            message.delete(1000)
            .then(async () => {
              let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
              let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
              var ChstatsEmbed = new Discord.RichEmbed()
                .setColor(0xe19517)
                .setTitle("Deine Kanal-Stats")
                .addField("Stats:","Dein Channel:\n"+"<#"+channel+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Cxc:\n"+msgcount2*2+"\n")
                .setTimestamp(Date("now"))
              this.message.channel.send(ChstatsEmbed);
            })
          }
        }).catch(console.error)
    })
  }
}
exports.delete_channel_User = (message) => {
  this.message = message;
  const Author = this.message.author
  Sale.findOne({Name:Author})
  .exec()
  .then(docs => {
    var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
var d1 = docs.createdDate, //Datum der zuzletzt geschriebenen cxcdailynachricht bekommen
    d2 = new Date ( d1 );
d2.setDate ( d1.getDate() + 1 );
    var channel = docs.Channelid
    if (channel != "undefined"){
      if (d2 > Today){
        this.message.channel.send("Dein Kanal wurde vor weniger als 24h erstellt. Um ihn jetzt löschen zu können , musst du mindestens 24h warten. Ansonsten kann sich dein Thema doch gar nicht entfalten.")
        return;
      }

        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel archived")
        .then(async () => {
          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*2
          if (newcxc == NaN) {
            this.message.channel.send("Es scheint so , als wäre etwas beim auslesen deiner cxc falschgelaufen. <@376394812888186890>")
            return;
          }
          Sale.updateOne({ _id: docs.id }, { $set: { Channelid: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            message.client.channels.get("509757254862372883").send(channel+" von "+Author+" wurde archiviert und hat "+newcxc+"cxc bekommen\n archiv")
          }).catch(console.error);
        }).catch(console.error);
    }
    else {
      this.message.channel.send("Du hast keinen Kanal!")
    }
  }).catch(err => {
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

exports.delete_channel_Admin = (PingData,message) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  Sale.findOne({Name2:PingData.Ping})
  .exec()
  .then(docs => {
    var channel = docs.Channelid
    if (channel != "undefined"){
        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel :"+channel+"\n archived")
        .then(async () => {
          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*2
          console.log(newcxc)
          Sale.updateOne({ _id: docs.id }, { $set: { Channelid: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            message.client.channels.get("509757254862372883").send(channel+" von "+Author+" wurde archiviert und hat "+newcxc+"cxc bekommen\n archiv_admin")
          }).catch(console.error);
        }).catch(console.error);
    }
    else {
      this.message.channel.send("Diese Person hat keinen Kanal")
    }
  }).catch(err => {
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
exports.unlink_channel_Admin = (PingData,message) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  Sale.findOne({Name:PingData.Ping})
  .exec()
  .then(docs => {
    var channel = docs.Channelid
    message.client.channels.get(channel).send("Dieser Channel wurde entlinkt. Der User: "+docs.Name+" erhält nun keine cxc mehr für diesen Channel.")
        Sale.updateOne({ _id: docs.id }, { $set: { Channelid: "undefined"} })
        .exec()
        .then(docs =>{
          message.client.channels.get("509757254862372883").send("channel von "+PingData.Ping+" wurde enlinkt \n unlink")
        })
      }).catch(err => {
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
