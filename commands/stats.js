const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Cxc = require("../commands/cxc");
const Discord = require('discord.js');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

exports.stats = (message) => {
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
this.message = message;
Sale.find()
.exec()
.then(docs => {
  var cxcstat = 0
  var mesgstat = 0
  docs.forEach((doc, idx, message) => {
    cxcstat = doc.cxc + cxcstat
    mesgstat = mesgstat + doc.messages
    })
    this.message.channel.send("```Gesamte cxc im Umlauf : "+cxcstat+"\nGeschriebene Nachrichten seit aufzeichnung : "+mesgstat+"```")
  })
  .catch(err => {//message fuction
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
