const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const Loghandler = require('./Loghandler');
dotenv.config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});
//cxc auslesen
exports.get_cxc = (PingData, message) => {

  this.message = message;
  if (PingData.Ping != undefined) {
    Sale.findOne({
        Name2: PingData.Ping
      })
      .exec()
      .then(docs => {
        this.message.channel.send(docs.Name + " hat aktuell **" + docs.cxc + "** Nova-Coins")
      }).catch(err => {
        //this.message.channel.send("Handy Ping Version")
        Sale.findOne({
            Name: PingData.Ping
          })
          .exec()
          .then(docs => {
            this.message.channel.send(docs.Name + " hat aktuell **" + docs.cxc + "** Nova-Coins")
          }).catch(err => {
            this.message.channel.send("Ein Fehler ist aufgetreten. Ein Fehlerbericht  wurde Bereits an den Entwickler gesendet.")
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
          })
      });
  } else {
    const MemberID = this.message.author.id
    Sale.findOne({
        MemberId: MemberID
      })
      .exec()
      .then(docs => {
        this.message.channel.send(docs.Name + " hat aktuell **" + docs.cxc + "** Nova-Coins")
      }).catch(err => {
        this.message.channel.send("Ein Fehler ist augetreten. Ein Fehlerbericht  wurde Bereits an den Entwickler gesendet.")
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
}
//cxc in die database schreiben
exports.add_cxc = (message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  Splitmessage = this.message.content.split(" ")
  fs.readFile('./bannedwords/blacklist.txt', "utf8", (err, data) => {
    if (err) throw err;
    let words = data.split("|")
    for (i = 0; i < Splitmessage.length; i++) {
      for (j = 0; j < words.length; j++) {
        if (Splitmessage[i] == words[j]) {
          return;
        }
      }
    }

    Sale.findOne({
        MemberId: MemberID
      })
      .exec()
      .then(docs => {

        var Today = new Date() //Heutigen Tag bekommen. mit Date("now") gehts ned
        var d1 = docs.Date, //Datum der zuzletzt geschriebenen Nachricht bekommen
          d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + 1);

        if (Today > d2) { //wenn der hinterlegte Zeitpunkt nicht mehr der jetzige ist , dann bitte speichern
          var CXC = docs.cxc + 10
          Sale.updateOne({
              _id: docs._id
            }, {
              $set: {
                cxc: CXC,
                Date: Date("now")
              }
            })
            .exec()
            .then(docs => {}).catch(err => {
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
              return;
            });
        } else { //wenn der hinterlegte Zeitpunkt der jetzige ist , dann bitte nicht speichern
          var CXC = docs.cxc
          Sale.updateOne({
              _id: docs._id
            }, {
              $set: {
                cxc: CXC,
              }
            })
            .exec()
            .then(docs => {}).catch(err => {
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
  })
}

exports.transfer_cxc = (PingData, NewCxc, message) => {
  this.message = message;
  const Author = this.message.author
  const MemberID = this.message.author.id
  if (NewCxc.cxc < 10) {
    this.message.channel.send("Der bezahlte Betrag muss mindestens 10nvc betragen");
    return;
  }
  if (!PingData.Ping) {
    this.message.channel.send("Deine gepingte person existiert nicht");
    console.error();
    return;
  }
  if (PingData.Ping == "<@!" + this.message.author.id + ">") {
    this.message.channel.send("Du darfst dir selbst keine nvc übertragen.")
    return;
  }
  Sale.findOne({
      MemberId: MemberID
    })
    .exec()
    .then(docs => {
      if (NewCxc.cxc > docs.cxc) {
        this.message.channel.send("Du willst also in die Miesen gehen ?\n**ohne mich!**")
        return;
      }
      Sale.updateOne({
          _id: docs._id
        }, {
          $set: {
            cxc: docs.cxc - NewCxc.cxc
          }
        })
        .exec()
        .then(docs => {
          this.message.channel.send(NewCxc.cxc + " wurden zu " + PingData.Ping + " übertragen")
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
          this.message.channel.send("Error: bitte deffiniere eine nvc anzahl")
          console.error(err);
        });
      Sale.findOne({
          Name: PingData.Ping
        })
        .exec()
        .then(docs => {
          Sale.updateOne({
              _id: docs._id
            }, {
              $set: {
                cxc: docs.cxc + NewCxc.cxc
              }
            })
            .exec()
            .then(docs => {
              this.message.channel.send("nvc wurden bei " + PingData.Ping + " hinzugefügt")
            })
        }).catch(err => {
          Sale.findOne({
              Name2: PingData.Ping
            })
            .exec()
            .then(docs => {
              Sale.updateOne({
                  _id: docs._id
                }, {
                  $set: {
                    cxc: docs.cxc + NewCxc.cxc
                  }
                })
                .exec()
                .then(docs => {
                  this.message.channel.send("nvc wurden bei " + PingData.Ping + " hinzugefügt")
                })
            }).catch(err => {
              this.message.channel.send("Ein Fehler ist augetreten. Ein Fehlerbericht  wurde Bereits an den Entwickler gesendet.")
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
            })

        });
      Loghandler.log(message, Author, PingData.Ping, "transfer", undefined, undefined)
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

}