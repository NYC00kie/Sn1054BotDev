const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const fs = require('fs');
const Loghandler = require('./Loghandler');

exports.add_cxc = (message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  Splitmessage = this.message.content.split(" ")

  Sale.findOne({
      MemberId: MemberID
    })
    .exec()
    .then(docs => {

      var Today = new Date() //Heutigen Tag bekommen. mit Date("now") gehts ned
      var d1 = docs.lastdaily, //Datum der zuzletzt geschriebenen cxcdailynachricht bekommen
        d2 = new Date(d1);
      d2.setDate(d1.getDate() + 1);


      if (Today > d2) { //wenn der hinterlegte Zeitpunkt nicht mehr der jetzige ist , dann bitte speichern
        Loghandler.log(message, Author, undefined, "daily", undefined, undefined)
        this.message.react('💸')
        var CXC = docs.cxc + 300
        console.log("1 day later")
        Sale.updateOne({
            _id: docs._id
          }, {
            $set: {
              cxc: CXC,
              lastdaily: Date("now")
            }
          })
          .exec()
          .then(docs => {})
      } else { //wenn der hinterlegte Zeitpunkt der jetzige ist , dann bitte nicht speichern
        return;
      }

    })
    .catch(console.error)

}