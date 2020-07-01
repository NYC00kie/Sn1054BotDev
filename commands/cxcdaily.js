const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const fs = require('fs');

exports.add_cxc =  (message) => {
  this.message = message;
  const Author = this.message.author
  Splitmessage = this.message.content.split(" ")
  fs.readFile('./bannedwords/blacklist.txt',"utf8",(err, data) => {
    if (err) throw err;
      let words = data.split("|")
        for (i=0;i<Splitmessage.length;i++) {
          for (j = 0; j< words.length;j++) {
            if (Splitmessage[i]==words[j]) {
              message.client.channels.get("509757254862372883").send(message.author+"hat ein geblacklistetes Wort geschriebenen \n Blacklist")
              return;
            }
          }
        }

              Sale.findOne({Name:Author})
              .exec()
              .then(docs => {

            var Today = new Date () //Heutigen Tag bekommen. mit Date("now") gehts ned
            var d1 = docs.lastdaily, //Datum der zuzletzt geschriebenen cxcdailynachricht bekommen
                d2 = new Date ( d1 );
            d2.setDate ( d1.getDate() + 1 );
                var Messagecount = docs.messages + 1

                if (Today > d2) {//wenn der hinterlegte Zeitpunkt nicht mehr der jetzige ist , dann bitte speichern
                    message.client.channels.get("509757254862372883").send(message.author+"hat 300nvc bekommen \n nvcdaily")
                    this.message.react('💸')
                var CXC = docs.cxc + 300
                console.log("1 day later")
                Sale.updateOne({ _id: docs._id }, { $set: { cxc:CXC , messages:Messagecount, lastdaily:Date("now")} })
                .exec()
                .then(docs => {
                })
            }

            else {//wenn der hinterlegte Zeitpunkt der jetzige ist , dann bitte nicht speichern
              return;
            }

            })
            .catch(console.error)

})
}
