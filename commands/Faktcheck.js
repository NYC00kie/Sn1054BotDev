const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const request = require('request');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

exports.check = (message,Begriff) => {
this.message = message;
var query = Begriff
if (!query) {
  this.message.channel.send("Dein Suchbegriff scheint nicht sehr eindeutig zu sein.")
  return;
}
let Suche = encodeURIComponent(query)

var url = "https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles="+Suche+"&indexpageids";//Der Link für den Zugriff auf die Wikipedia Api

request(url, (err, response, body) => {
if (err) {
 var error = "cannot connect to the server";
 console.log(error);
} else {
    console.log(body);
   var wiki = JSON.parse(body);
   let Pageid0 = wiki.query.pageids
   let Pageid1 = Pageid0[0]
   let Pages = wiki.query.pages
   let Pagecontent = Pages[Pageid1].extract
   if (!Pagecontent) {
     this.message.channel.send("Es scheint so, als hätte deine Suche ("+query+") kein Ergebniss. \nVersuche es sonst nocheinmal mit dem Wort im Singular. \nEs könnte außerdem sein, dass du dich verschrieben hast.")
     return;
   }

   let zeroth = Pagecontent.split("\n")
   let zeroth2 = zeroth[0].split('')+zeroth[1].split('')
   if (zeroth2.length>2000) {
     this.message.channel.send(zeroth[0]+"\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/"+Suche+" \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.")
   }
   if (zeroth.length>2){
   this.message.channel.send(zeroth[0]+"\n"+zeroth[1]+"\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/"+Suche+" \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.")
   .catch(err => {
     console.log(err)
   })
 }
 else {
   this.message.channel.send(zeroth[0]+"\n"+zeroth[1]+ "\n \nMehr Informationen findest du hier: https://de.wikipedia.org/wiki/"+Suche+" \n \nDiese Informationen wurden von Wikipedia, der freien Enzyklopädie bereitgestellt.")
 }
}
});
}
