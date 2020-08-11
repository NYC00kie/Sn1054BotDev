const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.bye_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.byegif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
  return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/bye.gif"] });
}
})
}

exports.happy_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.happygif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/happy.gif"] });
}
})
}

exports.klick_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.klickgif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/klick.gif"] });
}
})
};


exports.point_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.pointgif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/point.gif"] });
}
})
}


exports.sad_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id

Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.sadgif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/sad.gif"] });
}
})
}


exports.spock_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.spockgif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/spock.gif"] });
}
})
}


exports.thumbs_gif = (message) => {
this.message = message;
const Author = this.message.author
const MemberID = this.message.author.id
Sale.findOne({MemberId:MemberID})
.exec()
.then(docs => {
if (docs.thumbsgif==0) {
  this.message.author.send("Du hast dieses Gif noch nicht gekauft")
return;
}
else {
message.channel.send({ files: ["./commands/cxgifs/thumbs.gif"] });
}
})
}
