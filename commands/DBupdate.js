const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Cxc = require("../commands/cxc");
const Discord = require('discord.js');
const nodemailer = require('nodemailer');

exports.update = (message) => {
  this.message = message;
  /*if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
*/
  var transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    auth: {
      user: process.env.Mailadress,
      pass: process.env.Mailpw
    }

  });
  Sale.find()
  .exec()
  .then(docs => {
    docs.forEach((doc, idx, message) => {
        var Name = doc.Name
        var args = Name.split("")
        args.pop()
        args.shift()
        args.shift()
        console.log(Name)
        console.log(args.join(''))
        var ID = args.join('')
        const NewProfile = new Sale({
            _id: new mongoose.Types.ObjectId(),
            Name: doc.Name,
            Name2: doc.Name2,
            MemberId: ID,
            Nickname:  doc.Nickname,
            Date: doc.Date,
            lastdaily: doc.lastdaily,
            Channelid: doc.Channelid,
            createdDate: doc.createdDate,
            cxc: doc.cxc,
            messages: doc.messages,
            memes: doc.memes,
            stammgast: doc.stammgast,
            Bohr: doc.Bohr,
            Curie: doc.Curie,
            Tesla: doc.Tesla,
            Newton: doc.Newton,
            Einstein: doc.Einstein,
            Hawking: doc.Hawking,
            Musk: doc.Musk,
            Vip: doc.Vip,
            Clixoomer: doc.Clixoomer,
            byegif: doc.byegif,
            happygif: doc.happygif,
            klickgif: doc.klickgif,
            pointgif: doc.pointgif,
            sadgif: doc.sadgif,
            spockgif: doc.spockgif,
            thumbsgif: doc.thumbsgif
          });
          const Oldid = doc._id
          NewProfile.save()
          .then(doc => {
            console.log("person updated")
          })
          .catch(err => {
            console.error(err);
          });
          Sale.deleteOne({_id:Oldid})
          .catch(err => {
            console.error(err);
          });
    })
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
    this.message.channel.send("DB update durchgeführt")
}
