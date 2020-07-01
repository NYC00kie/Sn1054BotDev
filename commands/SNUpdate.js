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
})

exports.SNUpdate = (message) => {
  this.message = message;
 if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  var cxc = 0
  Sale.find()
  .exec()
  .then(docs => {
    docs.forEach((doc, idx, message) => {
      let guildMember = message.guild.member.get(doc.MemberId)
      if (doc.stammgast == 0){

         var cxc1= 0
      }
      else {
        var cxc1= 4750
        guildMember.removeRole("518395091472089101")
      }
      if (doc.Bohr == 0){

         cxc2= 0
      }
      else {
        var cxc2= 7600
        guildMember.removeRole("518384555007148042")
      }
      if (doc.Curie == 0){

         var cxc3= 0
      }
      else {
        var cxc3= 9500
        guildMember.removeRole("518384549408014343")
      }
      if (doc.Tesla == 0){

         var cxc4= 0
      }
      else {
        var cxc4= 12350
        guildMember.removeRole("518384546492973056")
      }
      if (doc.Newton == 0){

         var cxc5= 0
      }
      else {
        var cxc5= 12350
        guildMember.removeRole("518384356222566410")
      }
      if (doc.Einstein == 0){

         var cxc6=0
      }
      else {
        var cxc6=19950
        guildMember.removeRole("518384355698278430")
      }
      if (doc.Hawking == 0){

         var cxc7 = 0
      }
      else {
        var cxc7= 19950
        guildMember.removeRole("518384354880258049")
      }
      if (doc.Musk == 0){

         cxc8=0
      }
      else {
        var cxc8=71250
        guildMember.removeRole("518384354272215060")
      }
      if (doc.Vip == 0){

         cxc9= 0
      }
      else {
        var cxc9= 78375
        guildMember.removeRole("518384353387085845")
      }
      if (doc.Clixoomer == 0){

         var cxc10=0
      }
      else {
        var cxc10=95000
        guildMember.addRole("649996757052424222")
        guildMember.removeRole("518172524811386890")
      }
      var cxc_next = cxc1+cxc2+cxc3+cxc4+cxc5+cxc6+cxc7+cxc8+cxc9+cxc10 + doc.cxc

      var Prestiegewert = Math.round(cxc_next/100)
      const NewProfile = new Sale({
          _id: new mongoose.Types.ObjectId(),
          Name: doc.Name,
          Name2: doc.Name2,
          MemberId: doc.MemberId,
          Nickname:  doc.Nickname,
          Date: doc.Date,
          lastdaily: doc.lastdaily,
          Channelid: doc.Channelid,
          createdDate: doc.createdDate,
          cxc: 0,
          Prestiege:Prestiegewert,
          messages: doc.messages,
          memes: doc.memes,
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
          byegif: doc.byegif,
          happygif: doc.happygif,
          klickgif: doc.klickgif,
          pointgif: doc.pointgif,
          sadgif: doc.sadgif,
          spockgif: doc.spockgif,
          thumbsgif: doc.thumbsgif
        });
        console.log(doc.Nickname+"wurde geupdated")
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
}
