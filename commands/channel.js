const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const howmany = require('./howmany');
const Loghandler = require('./Loghandler');
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

exports.create_channel = async (ChannelData,message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id

let docs = await Sale.findOne({MemberId:MemberID})

  if (docs.Channelid == "undefined"){//testen , ob der User bereits einen Channel hat
  message.delete(1000)
  this.message.member.guild.createChannel(ChannelData.name, "text")//Channel erstellen
  .then(newchannel => {
    var channelidid = newchannel.id
    Loghandler.log(message,Author,undefined,"channelcreate",undefined,channelidid)
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
else if (docs.Channelid2=="undefined") {
  if (await howmany.roles(this.message.author.id) > 1) {
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
        Sale.updateOne({ _id: docs.id }, { $set: { Channelid2: channelidid ,createdDate2: Date("now")} })//update Channel in DB
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
    this.message.channel.send("Du hast bereits einen Kanal und nicht genug rollen um einen weiteren zu erstellen.")
  }
}
else {
  this.message.channel.send("Du hast bereits 2 Kanäle.")
}
}
exports.chstats_channel_User = (PingData,message) => {

  this.message = message;
  const MemberID = this.message.author.id
  const Author = this.message.author
  if (PingData.Ping == undefined) {
  Sale.findOne({MemberId:MemberID})
  .exec()
  .then(docs => {
    message.delete(1000)
    if (docs.Channelid != "undefined"){

        Promise.resolve()
        .then(async () => {
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid))
          let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
          var ChstatsEmbed = new Discord.MessageEmbed()
            .setColor(0xe19517)
            .setTitle("Deine Kanal-Stats")
            .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
            .setTimestamp(Date("now"))
          this.message.channel.send(ChstatsEmbed);

        }).catch(console.error);
    }
    if (docs.Channelid2 != "undefined") {

      Promise.resolve()
      .then(async () => {
        let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid2))
        let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
        var ChstatsEmbed = new Discord.MessageEmbed()
          .setColor(0xe19517)
          .setTitle("Deine Kanal-Stats")
          .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid2+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
          .setTimestamp(Date("now"))
        this.message.channel.send(ChstatsEmbed);

      }).catch(console.error);
    }
    if (docs.Channelid2 == "undefined" && docs.Channelid == "undefined") {
      this.message.channel.send("Du hast keinen Kanal, für den man Statistiken anzeigen könnte.")
    }

  })
  }
  else {

    Sale.findOne({Name:PingData.Ping})
    .exec()
    .then(async docs => {

    if (docs.Channelid != "undefined" && docs.Channelid2 != "undefined") {


      if (docs.Channelid != "undefined"){

            let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid))
            let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
            var ChstatsEmbed = new Discord.MessageEmbed()
              .setColor(0xe19517)
              .setTitle("Deine Kanal-Stats")
              .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
              .setTimestamp(Date("now"))
            this.message.channel.send(ChstatsEmbed).catch(console.error());

        }
        if (docs.Channelid2 != "undefined"){

            let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid2))
            let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
            var ChstatsEmbed2 = new Discord.MessageEmbed()
              .setColor(0xe19517)
              .setTitle("Deine Kanal-Stats")
              .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid2+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
              .setTimestamp(Date("now"))
            this.message.channel.send(ChstatsEmbed2).catch(console.error());

        }
      }
      else {
        this.message.channel.send("Die Gepingte Person hast keinen Kanal")
      }
    }).catch(err => {
      Sale.findOne({Name2:PingData.Ping})
      .exec()
      .then(async docs => {

            if (docs.Channelid != "undefined" && docs.Channelid2 != "undefined") {


              if (docs.Channelid != "undefined"){

                    let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid))
                    let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
                    var ChstatsEmbed = new Discord.MessageEmbed()
                      .setColor(0xe19517)
                      .setTitle("Deine Kanal-Stats")
                      .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
                      .setTimestamp(Date("now"))
                    this.message.channel.send(ChstatsEmbed).catch(console.error());

                }
                if (docs.Channelid2 != "undefined"){

                    let msgcount1 = await lots_of_messages_getter(message.client.channels.get(docs.Channelid2))
                    let msgcount2 = await how_many_messages_are_there_actually(msgcount1)
                    var ChstatsEmbed2 = new Discord.MessageEmbed()
                      .setColor(0xe19517)
                      .setTitle("Deine Kanal-Stats")
                      .addField("Stats:","Dein Channel:\n"+"<#"+docs.Channelid2+">"+"\n\nNachrichten:\n"+msgcount2+"\n\nvorrausgesehene Nvc:\n"+msgcount2*5+"\n")
                      .setTimestamp(Date("now"))
                    this.message.channel.send(ChstatsEmbed2).catch(console.error());

                }
              }
              else {
                this.message.channel.send("Die Gepingte Person hast keinen Kanal")
              }
        }).catch(console.error)
    })
  }
}

exports.delete_channel_User = async (PingData,message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  let docs = await Sale.findOne({MemberId:MemberID})


    var channel = docs.Channelid
    if (channel != "undefined"&&docs.Channelid2=="undefined"){//channel 1 definiert, channel 2 undefiniert

      var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
      var d1 = docs.createdDate, //Datum bekommen, wann der Kanal erstellt wurde
      d2 = new Date ( d1 );
      d2.setDate ( d1.getDate() + 1 );


      if (d2 > Today){
        this.message.channel.send("Dein Kanal wurde vor weniger als 24h erstellt. Um ihn jetzt löschen zu können , musst du mindestens 24h warten. Ansonsten kann sich dein Thema doch gar nicht entfalten.")
        return;
      }

        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel archived")
        .then(async () => {

          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*5

          if (newcxc == NaN) {
            this.message.channel.send("Es scheint so , als wäre etwas beim auslesen deiner cxc falschgelaufen. <@376394812888186890>")
            return;
          }

          Sale.updateOne({ _id: docs.id }, { $set: { Channelid: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            Loghandler.log(message,Author,undefined,"channeldelete",undefined,channel)
          }).catch(console.error);
        }).catch(console.error);
    }
    else if (channel == "undefined"&&docs.Channelid2!="undefined") {//channel 1 undefiniert, channel 2 definiert
      var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
      var d1 = docs.createdDate2, //Datum bekommen, wann der Kanal erstellt wurde
      d2 = new Date ( d1 );
      d2.setDate ( d1.getDate() + 1 );
      var channel = docs.Channelid2
      if (d2 > Today){
        this.message.channel.send("Dein Kanal wurde vor weniger als 24h erstellt. Um ihn jetzt löschen zu können , musst du mindestens 24h warten. Ansonsten kann sich dein Thema doch gar nicht entfalten.")
        return;
      }
      message.client.channels.get(channel).setParent("518452814691827731");
      message.client.channels.get(channel).send("Channel archived")
      .then(async () => {

        message.client.channels.get(channel).lockPermissions()
        let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
        let newcxc = await how_many_messages_are_there_actually(msgcount1)*5

        if (newcxc == NaN) {
          this.message.channel.send("Es scheint so , als wäre etwas beim auslesen deiner cxc falschgelaufen. <@376394812888186890>")
          return;
        }

        Sale.updateOne({ _id: docs.id }, { $set: { Channelid2: "undefined" , cxc: docs.cxc+newcxc} })
        .exec()
        .then(docs =>{
          Loghandler.log(message,Author,undefined,"channeldelete",undefined,channel)
        }).catch(console.error);
      }).catch(console.error);
    }
    else if (channel != "undefined"&&docs.Channelid2!="undefined") {// es gibt zwei kanäle und der User muss entscheiden welchen der beiden er löscht
      if (PingData.Ping==undefined) {
        this.message.channel.send("Da du zwei kanäle hast musst du genau angeben welchen Kanal du löschen möchtest.\n Dies machst du indem du \n.delete <#"+docs.Channelid+">\neingibst oder .delete <#"+docs.Channelid2+"> .\n welchen Channel du pingst wählt dann schließlich aus, welchen Channel du archivierst.")
      }
      if (PingData.Ping == "<#"+docs.Channelid+">") {
        var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
        var d1 = docs.createdDate, //Datum bekommen, wann der Kanal erstellt wurde
        d2 = new Date ( d1 );
        d2.setDate ( d1.getDate() + 1 );
        var channel = docs.Channelid
        if (d2 > Today){
          this.message.channel.send("Dein Kanal wurde vor weniger als 24h erstellt. Um ihn jetzt löschen zu können , musst du mindestens 24h warten. Ansonsten kann sich dein Thema doch gar nicht entfalten.")
          return;
        }
        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel archived")
        .then(async () => {

          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*5

          if (newcxc == NaN) {
            this.message.channel.send("Es scheint so , als wäre etwas beim auslesen deiner cxc falschgelaufen. <@376394812888186890>")
            return;
          }

          Sale.updateOne({ _id: docs.id }, { $set: { Channelid: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            Loghandler.log(message,Author,undefined,"channeldelete",undefined,channel)
          }).catch(console.error);
        }).catch(console.error);
      }
      else if (PingData.Ping == "<#"+docs.Channelid2+">") {
        var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
        var d1 = docs.createdDate2, //Datum bekommen, wann der Kanal erstellt wurde
        d2 = new Date ( d1 );
        d2.setDate ( d1.getDate() + 1 );
        var channel = docs.Channelid2
        if (d2 > Today){
          this.message.channel.send("Dein Kanal wurde vor weniger als 24h erstellt. Um ihn jetzt löschen zu können , musst du mindestens 24h warten. Ansonsten kann sich dein Thema doch gar nicht entfalten.")
          return;
        }
        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel archived")
        .then(async () => {

          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*5

          if (newcxc == NaN) {
            this.message.channel.send("Es scheint so , als wäre etwas beim auslesen deiner cxc falschgelaufen. <@376394812888186890>")
            return;
          }

          Sale.updateOne({ _id: docs.id }, { $set: { Channelid2: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            Loghandler.log(message,Author,undefined,"channeldelete",undefined,channel)
          }).catch(console.error);
        }).catch(console.error);
      }
      else {
        this.message.channel.send("Es scheint so als gehöre der erwähnte Channel garnicht dir.\n Deine Channel sind:\n <#"+docs.Channelid+">\n<#"+docs.Channelid2+">")
      }
    }else {
      this.message.channel.send("Du hast keinen Kanal!")
    }

}

exports.delete_channel_Admin = (PingData,message) => {
  let preprechannelid = PingData.Ping.split("<#")
  let prechannelid = preprechannelid[1].split(">")
  let channelid = prechannelid[0]
  this.message = message;
  if (!message.member.roles.cache.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  Sale.findOne({Channelid:channelid})
  .exec()
  .then(docs => {
    var channel = docs.Channelid

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
            Loghandler.log(message,PingData.Ping,undefined,"channelarchiv",undefined,channel)
          }).catch(console.error);
        }).catch(console.error);

  }).catch(err => {
  Sale.findOne({Channelid2:channelid})
  .exec()
  .then(docs => {
    var channel = docs.Channelid2

        message.client.channels.get(channel).setParent("518452814691827731");
        message.client.channels.get(channel).send("Channel :"+channel+"\n archived")
        .then(async () => {
          message.client.channels.get(channel).lockPermissions()
          let msgcount1 = await lots_of_messages_getter(message.client.channels.get(channel))
          let newcxc = await how_many_messages_are_there_actually(msgcount1)*2
          console.log(newcxc)
          Sale.updateOne({ _id: docs.id }, { $set: { Channelid2: "undefined" , cxc: docs.cxc+newcxc} })
          .exec()
          .then(docs =>{
            Loghandler.log(message,PingData.Ping,undefined,"channelarchiv",undefined,channel)
          }).catch(console.error);
        }).catch(console.error);

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
  })
}

exports.unlink_channel_Admin = (PingData,message) => {
  this.message = message;
  if (!message.member.roles.cache.some(role => role.id === "450742960678764544")){
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
