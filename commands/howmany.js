const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const Sale = require('../models/sale');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});
exports.roles = async (ID) => {

let docs = await Sale.findOne({MemberId:ID})
    if (docs.stammgast==0){
      var stammgast = 0
    }
    else {
      var stammgast = 1
    }
    if (docs.Bohr==0){
      var Bohr = 0
    }
    else {
      var Bohr = 1
    }
    if (docs.Curie==0){
      var Curie = 0
    }
    else {
      var Curie = 1
    }
    if (docs.Tesla==0){
      var Tesla = 0
    }
    else {
      var Tesla = 1
    }
    if (docs.Newton==0){
      var Newton = 0
    }
    else {
      var Newton = 1
    }
    if (docs.Einstein==0){
      var Einstein = 0
    }
    else {
      var Einstein = 1
    }
    if (docs.Hawking==0){
      var Hawking = 0
    }
    else {
      var Hawking = 1
    }
    if (docs.Musk==0){
      var Musk = 0
    }
    else {
      var Musk = 1
    }
    if (docs.Vip==0){
      var Vip = 0
    }
    else {
      var Vip = 1
    }
    if (docs.Clixoomer==0){
      var Clixoomer = 1
    }
    else {
      var Clixoomer = 1
    }
    if (docs.quasar==0){
      var quasar = 0
    }
    else {
      var quasar = 1
    }
    var Wert = 0
    var Wert = stammgast+Bohr+Curie+Tesla+Newton+Einstein+Hawking+Musk+Vip+Clixoomer
    return Wert
}

exports.roleseach = async (ID) => {

let docs = await Sale.findOne({MemberId:ID})
    if (docs.stammgast==0){
      var stammgast = 0
    }
    else {
      var stammgast = 1
    }
    if (docs.Bohr==0){
      var Bohr = 0
    }
    else {
      var Bohr = 1
    }
    if (docs.Curie==0){
      var Curie = 0
    }
    else {
      var Curie = 1
    }
    if (docs.Tesla==0){
      var Tesla = 0
    }
    else {
      var Tesla = 1
    }
    if (docs.Newton==0){
      var Newton = 0
    }
    else {
      var Newton = 1
    }
    if (docs.Einstein==0){
      var Einstein = 0
    }
    else {
      var Einstein = 1
    }
    if (docs.Hawking==0){
      var Hawking = 0
    }
    else {
      var Hawking = 1
    }
    if (docs.Musk==0){
      var Musk = 0
    }
    else {
      var Musk = 1
    }
    if (docs.Vip==0){
      var Vip = 0
    }
    else {
      var Vip = 1
    }
    if (docs.Clixoomer==0){
      var Clixoomer = 0
    }
    else {
      var Clixoomer = 1
    }
    if (docs.quasar==0){
      var quasar = 0
    }
    else {
      var quasar = 1
    }
    var Wert = 0
    var Wert = {
      Stammgast:stammgast,
      Bohr:Bohr,
      Curie:Curie,
      Tesla:Tesla,
      Newton:Newton,
      Einstein:Einstein,
      Hawking:Hawking,
      Musk:Musk,
      Vip:Vip,
      Clixoomer:Clixoomer,
      Quasar:quasar}
    return Wert
}
