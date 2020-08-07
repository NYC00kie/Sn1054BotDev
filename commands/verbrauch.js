const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

exports.verbrauch = (message) => {
this.message = message;

fetch('http://wechsel1.fritz.box/solar_api/v1/GetInverterRealtimeData.cgi?Scope=System',{//API call
  methode: 'GET'
}).then(async response => {
  return response.json();
}).then(async text =>  {

  const Jahresverbrauch = 26000
  var Tagesertrag = text.Body.Data.DAY_ENERGY.Values[1]
  var Jahresertrag = text.Body.Data.YEAR_ENERGY.Values[1]
  var ErgebnisJahr = Math.round((Jahresverbrauch/Jahresertrag)*100000)
  var ErgebnisTag = Math.round(((Jahresverbrauch/365)/Tagesertrag)*100000)

  let Verbrauchembed = new Discord.RichEmbed()
  .setTitle("Verbrauch")
  .setColor(0x59e330)
  .addField("Heute","Prozentualer Verbauch des Server vom Stroms am heutigen Tag von der Photovoltaik anlage \n"+ErgebnisTag/1000)
  .addField("Jahr","Prozentualer Verbauch des Server vom Stroms im heutigen Jahr von der Photovoltaik anlage \n"+ErgebnisJahr/1000)
  this.message.channel.send(Verbrauchembed)
})
.catch(err => console.error(err))
};
