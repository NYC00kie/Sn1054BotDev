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
exports.setcxc = (PingData, message, NewCxc) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  if (PingData.Ping==undefined){
    this.message.channel.send("Bitte deffiniere eine Person")
    return;
  }
  if (NewCxc.cxc==undefined){
    this.message.channel.send("Bitte deffiniere einen betrag")
    return;
  }
  Sale.findOne({Name2:PingData.Ping})
  .exec()
  .then(docs => {
    Sale.updateOne({ _id: docs._id }, { $set: { cxc: NewCxc.cxc} })
    .exec()
    .then(docs => {
      this.message.channel.send("nvc Betrag gesetzt")
    }).catch(err =>{
      var e = new Error(err);
      const Es = e.toString()
      var mailOptions = {
        from: process.env.Mailadress,
        to: process.env.MyMailadress,
        subject: "Error",
        text: Es + Date("now")
      };
      this.message.channel.send("undefined nvc input");
      this.message.channel.send(e.toString())
      transporter.sendMail(mailOptions);
      console.error(err);
    });

}).catch(err =>{
  var e = new Error(err);
  const Es = e.toString()
  var mailOptions = {
    from: process.env.Mailadress,
    to: process.env.MyMailadress,
    subject: "Error",
    text: Es + Date("now")
  };
  this.message.channel.send("undefined Ping input");
  this.message.channel.send(e.toString())
  transporter.sendMail(mailOptions);
  console.error(err);
});
}

exports.remcxc = (PingData, message, NewCxc) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  if (PingData.Ping==undefined){
    this.message.channel.send("Bitte deffiniere eine Person")
    return;
  }
  if (NewCxc.cxc==undefined){
    this.message.channel.send("Bitte deffiniere einen betrag")
    return;
  }
  Sale.findOne({Name2:PingData.Ping})
  .exec()
  .then(docs => {
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-NewCxc.cxc} })
    .exec()
    .then(docs => {
      this.message.channel.send("nvc entfernt")
    }).catch(err =>{
      var e = new Error(err);
      const Es = e.toString()
      var mailOptions = {
        from: process.env.Mailadress,
        to: process.env.MyMailadress,
        subject: "Error",
        text: Es + Date("now")
      };
      this.message.channel.send("undefined nvc input");
      this.message.channel.send(e.toString())
      transporter.sendMail(mailOptions);
      console.error(err);
    });

}).catch(err =>{
  var e = new Error(err);
  const Es = e.toString()
  var mailOptions = {
    from: process.env.Mailadress,
    to: process.env.MyMailadress,
    subject: "Error",
    text: Es + Date("now")
  };
  this.message.channel.send("undefined Ping input");
  this.message.channel.send(e.toString())
  transporter.sendMail(mailOptions);
  console.error(err);
});
}


exports.givecxc = (PingData, message, NewCxc) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  if (PingData.Ping==undefined){
    this.message.channel.send("Bitte deffiniere eine Person")
    return;
  }
  if (NewCxc.cxc==undefined){
    this.message.channel.send("Bitte deffiniere einen betrag")
    return;
  }
  Sale.findOne({Name2:PingData.Ping})
  .exec()
  .then(docs => {
    Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+NewCxc.cxc} })
    .exec()
    .then(docs => {
      this.message.channel.send("nvc hinzugefügt")
    }).catch(err =>{
      var e = new Error(err);
      const Es = e.toString()
      var mailOptions = {
        from: process.env.Mailadress,
        to: process.env.MyMailadress,
        subject: "Error",
        text: Es + Date("now")
      };
transporter.sendMail(mailOptions);
      this.message.channel.send("undefined nvc input");
      this.message.channel.send(e.toString())
      console.error(err);
    });

}).catch(err =>{
  var e = new Error(err);
  const Es = e.toString()
  var mailOptions = {
    from: process.env.Mailadress,
    to: process.env.MyMailadress,
    subject: "Error",
    text: Es + Date("now")
  };
transporter.sendMail(mailOptions);
  this.message.channel.send("undefined Ping input");
  this.message.channel.send(e.toString())
  console.error(err);
});
}
