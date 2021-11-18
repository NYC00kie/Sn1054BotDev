const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

exports.whatsontrello = (message, token, key) => {
  this.message = message;
  fetch('https://api.trello.com/1/boards/5ef8e43cd6f9a86d5de0c914/lists?key=' + key + '&token=' + token, { //API call
      methode: 'GET'
    })
    .then(response => {
      return response.text();
    })
    .then(async text => {

      let parsedtext = JSON.parse(text)

      let Board = []
      for (var i = 0; i < parsedtext.length; i++) {

        var id = parsedtext[i].id

        var name = parsedtext[i].name

        await fetch(`https://api.trello.com/1/lists/${id}/cards?key=${process.env.Trellokey}&token=${process.env.Trellotoken}`, { //API call
            methode: 'GET'
          })
          .then(response => {
            return response.text()
          }).then(text2 => {
            var parsedtext2 = JSON.parse(text2)
            let Array = []
            for (var j = 0; j < parsedtext2.length; j++) {

              var Card = {
                name: parsedtext2[j].name,
                description: parsedtext2[j].desc
              }
              Array.push(Card)
            }


            var List = {
              ListName: name,
              card: Array
            }

            Board.push(List)




          })
        await sleep(500)
      }


      for (var j = 0; j < Board.length; j++) {
        await sleep(500)
        if (j > 2) {
          break;
        }

        var Trelloembed = new Discord.MessageEmbed()
          .setTitle(`${Board[j].ListName}`)
          .setColor(0x229bf2)
        for (var i = 0; i < Board[j].card.length; i++) {

          if (i > 9) {
            break;
          }
          Trelloembed.addField(`Name: ${Board[j].card[i].name}`, ` Beschreibung: ${Board[j].card[i].description}`)


        }

        this.message.channel.send(Trelloembed)

      }
    })
    .catch(err => console.error(err))



}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}