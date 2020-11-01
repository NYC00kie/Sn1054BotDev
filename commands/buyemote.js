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

exports.buy_emote = (RoleData,message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  const Search = RoleData.Whirole
  Sale.findOne({MemberId:MemberID})
  .exec()
  .then(docs => {
    if (Search=="happy"){
      if (docs.happygif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das HappyGif für: **1000nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,happygif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n happy \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="bye"){
      if (docs.byegif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das ByeGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,byegif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n bye \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="klick"){
      if (docs.klickgif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das klickGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,klickgif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n klick \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="point"){
      if (docs.pointgif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das pointGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,pointgif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n point \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="sad"){
      if (docs.sadgif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das sadGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,sadgif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n sad \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="hi"){
      if (docs.spockgif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das HiGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,spockgif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n hi \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else if (Search=="thumbs"){
      if (docs.thumbsgif == 1){
        this.message.channel.send("Du hast dieses Gif schon")
      }
      else if (docs.cxc >= 1000) {
        this.message.author.send("Du hast das thumbsGif für: **100nvc** gekauft")
        Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc-1000,thumbsgif:1} })
        .exec()
        .then(docs => {
          message.client.channels.cache.get("509757254862372883").send(message.author+":\n Emote gekauft:\n thumbs \n -100nvc")
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
          console.error(err);
        });
      }
      else {
    this.message.channel.send("Du hast nicht genug nvc")
  }
    }
    else {
      this.message.channel.send("bitte deffiniere ein Gif , das du kaufen möchtest")
    }
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
    console.error(err);
  });
}
