const Discord = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale')

exports.message_count = async (message) => {
  this.message = message;
  let docs = await Sale.findOne({
    MemberId: this.message.author.id
  })
  var Newmessages = docs.messages + 1

  Sale.updateOne({
      _id: docs.id
    }, {
      $set: {
        messages: Newmessages
      }
    }) //update Channel in DB
    .exec()
    .then(docs => {})
    .catch(err => {
      console.log(err);
    });
}