const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const Loghandler = require('../commands/Loghandler');
dotenv.config();


exports.morenvc = async (message) => {

  var transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    auth: {
      user: process.env.Mailadress,
      pass: process.env.Mailpw
    }
  });

    this.message = message
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    if (getRandomInt(30)==0){
      this.message.react('👌')
      const filter = (reaction) => reaction.emoji.name === '👌'
      this.message.awaitReactions(filter, {max:2,time: 10000 })
      .then(collected => {
        let tmp = collected.get('👌')
        tmp = JSON.parse(JSON.stringify(tmp.users.cache))
        let id =  tmp[1].id
        Sale.findOne({MemberId:id})
        .exec()
        .then(docs => {
          this.message.channel.send(`<@${id}> du hast das Race gewonnen du Lucker`)
          this.message.reactions.removeAll()
            .then(msg => {
              msg.delete({timeout:10000})
            })
          Loghandler.log(message,`<@${id}>`,undefined,"morenvc",undefined,undefined)
          Sale.updateOne({ _id: docs._id }, { $set: { cxc:docs.cxc+200} })
          .exec()
          .then(docs => {
          }).catch(err => {
              var e = new Error(err);
              const Es = e.toString()
              var mailOptions = {
                from: process.env.Mailadress,
                to: process.en20v.MyMailadress,
                subject: "Error",
                text: Es + Date("now")
              };
              transporter.sendMail(mailOptions);
              console.error(err);
              return;
            });
        })
        .catch(console.error);
      })
   }
   else {
     return;
   }
}
