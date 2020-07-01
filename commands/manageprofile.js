const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Cxc = require("../commands/cxc");
const Discord = require('discord.js');

exports.add_Profile_new = (member) => {
  const Profile = new Sale({
      _id: new mongoose.Types.ObjectId(),
      Name: "<@"+member.id+">",
      Name2: "<@!"+member.id+">",
      Nickname:  member.user.username,
      MemberId : member.id,
      Date: Date("now"),
      lastdaily: Date("now"),
      Channelid: "undefined",
      createdDate: Date("now"),
      Prestiege: 0,
      cxc: 0,
      messages: 0,
      memes: 0,
      stammgast: 0,
      Bohr: 0,
      Curie: 0,
      Tesla: 0,
      Newton: 0,
      Einstein: 0,
      Hawking: 0,
      Musk: 0,
      Vip: 0,
      Clixoomer: 0,
      quasar: 0,
      byegif: 0,
      happygif: 0,
      klickgif: 0,
      pointgif: 0,
      sadgif: 0,
      spockgif: 0,
      thumbsgif: 0
    });
  Sale.find( {MemberId:member.id}, function (err, results) {
    if (err) { console.error }
    if (!results.length) {
        console.log("no such person is in the Database")
            Profile.save()
          .then(doc => {
            console.log(doc);
            console.log("person saved")
          })
          .catch(err => {
            console.error(err);
          });

    }
})
}

exports.add_Profile_old = (message) => {

  this.message = message;
  const Profile = new Sale({
      _id: new mongoose.Types.ObjectId(),
      Name: this.message.author,
      Name2: "<@!"+this.message.author.id+">",
      Nickname:  this.message.author.username,
      MemberId : this.message.author.id,
      Date: Date("now"),
      lastdaily: Date("now"),
      Channelid: "undefined",
      createdDate: Date("now"),
      Prestiege: 0,
      cxc: 0,
      messages: 0,
      memes: 0,
      stammgast: 0,
      Bohr: 0,
      Curie: 0,
      Tesla: 0,
      Newton: 0,
      Einstein: 0,
      Hawking: 0,
      Musk: 0,
      Vip: 0,
      Clixoomer: 0,
      quasar: 0,
      byegif: 0,
      happygif: 0,
      klickgif: 0,
      pointgif: 0,
      sadgif: 0,
      spockgif: 0,
      thumbsgif: 0
    });
  Sale.find( {MemberId:this.message.author.id}, function (err, results) {
    if (err) { console.error }
    if (!results.length) {
        console.log("no such person is in the Database")
            Profile.save()
          .then(doc => {
            console.log(doc);
            console.log("person saved")
          })
          .catch(err => {
            console.error(err);
          });

    }
})

}

exports.remove_Profile = (member) => {

Sale.deleteOne({MemberId:member.id})
  .catch(err => {
    console.error(err);
  });

}


exports.reset_Profile = (PingData,message) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
    Sale.findOne({Name2:PingData.Ping})
    .exec()
    .then(docs => {
      Sale.updateOne({ _id: docs._id }, { $set: { Nickname:  this.message.author.username, Date: Date("now"), lastdaily: Date("now"), Channelid: "undefined", createdDate: Date("now"), cxc: 0, messages: 0, memes: 0, stammgast: 0, Bohr: 0, Curie: 0, Tesla: 0, Newton: 0, Einstein: 0, Hawking: 0, Musk: 0, Vip: 0, Clixoomer: 0,quasar: 0, byegif: 0, happygif: 0, klickgif: 0, pointgif: 0, sadgif: 0, spockgif: 0, thumbsgif: 0}})
      .exec()
      .then(docs => {
        this.message.channel.send(PingData.Ping+"s Account wurde zurück gesetzt")
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
        this.message.channel.send("Error: bitte deffiniere eine cxc anzahl")
        console.error(err);
      });
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
  message.client.channels.get("509757254862372883").send(PingData.Ping+"s Account wurde zurückgesetzt \n Reset")
    }
