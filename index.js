const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const PREFIX = "."
var fs = require("fs");
const Help = require("./commands/help");
const blacklist = require("./commands/addtoblacklist");
const checkblacklist = require("./commands/inblacklist")
const addprofile = require("./commands/addprofile");
const Cxc = require("./commands/cxc");
const Sale = require('./models/sale');
const Sellrole = require("./commands/sellrole");
const Buyrole = require("./commands/buyrole");
const Nick = require("./commands/changenick");
const buyemote = require("./commands/buyemote");
const channel = require("./commands/channel");
const Cxcdaily = require("./commands/cxcdaily");
const ahelp = require('./commands/ahelp');
const cxc = require('./commands/givecxc');
const Profil = require('./commands/profil');
const cxgifs = require('./commands/cx-gifs');
const dbupdate = require('./commands/DBupdate');
const stats = require('./commands/stats');
const insider = require('./commands/insider');
let bot = new Discord.Client();

bot.login(process.env.TOKEN);
bot.on('error',console.error)
bot.on('ready', async () => {
  bot.user.setPresence({game: {name: 'type .help to start'}})
  .then(console.log)
  .catch(console.error);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

//conect to DB
mongoose.connect('mongodb+srv://NY_Cookie:'+process.env.Password+'@clixoom-bot-oj9lk.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    dbName: process.env.DB,
  }
)
.then(() => {
  console.log('\nconnected to database\n')
}).catch(err => {//message fuction
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
mongoose.Promise = global.Promise;

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  auth: {
    user: process.env.Mailadress,
    pass: process.env.Mailpw
  }
});

//Execute Commands
bot.on("message",async message => {
  if (message.author.bot) {
    return;//leave if the Author is a Bot or the Bot itself
  };
  //console.log(message.content)
  if (message.channel instanceof Discord.DMChannel)return;//return if the Channel the message got send in is the PM channel
  addprofile.add_Profile(message);
  if(!message.content.startsWith(PREFIX)) {
    if (await checkblacklist.check_channel(message)) {
    Cxc.add_cxc(message);
    await sleep(1000);
    Cxcdaily.add_cxc(message);
    return;
    }
  }//return if there is no Prefix
  let args = message.content.substring(PREFIX.length).split(" ");
  let NewCxc = {
    cxc: Number(args[2])
  }
  let NewNick = {
    Nick: message.content.substr(PREFIX.length + args[0].length+1, 32)
  }
  let RoleData = {
    Whirole: args[1]
  }
  let PingData = {
    Ping: args[1]
  }
  let Word = args[1]
  //all Commands
  switch (args[0].toLowerCase()) {
      //here the sales should be displayed
    case "addblacklist":
      blacklist.add_word(message,Word)
      break;
    case "addchannel":
      blacklist.add_channel(message,Word)
      break;
    case "v":
      message.channel.send("Version 1.3.2 (20.06.2020)")
      break;
    case "amonunser":
      insider.AmonUnser(message)
      break;
    case "changenick":
      Nick.change_nick(NewNick,message)
      break;
    case "sellrole":
      Sellrole.remove_role(RoleData, message)
        break;
    case "buyrole":
      Buyrole.add_role(RoleData, message)
      break;
    case "cxc":
      Cxc.get_cxc(PingData, message);
      break;
    case "profil":
      Profil.get_profil(PingData, message)
      break;
    case "shop":
      Help.get_shophelp(message);
      break;
    case "help"://help Command
      Help.get_help(message);
      break;
    case "ahelp":
      ahelp.get_adminhelp(message);
      break;
    case "givecxc":
      cxc.givecxc(PingData, message, NewCxc)
      break;
    case "remcxc":
      cxc.remcxc(PingData, message, NewCxc)
      break;
    case "setcxc":
      cxc.setcxc(PingData, message, NewCxc)
      break;
    case "buyemote":
      buyemote.buy_emote(RoleData,message)
      break;
    case "create":
      let channelbeschreibung = message.content.substr(PREFIX.length + args[0].length + args[1].length+1, 1000)
      let ChannelData = {
        name: args[1],
        beschreibung: channelbeschreibung
        }
      channel.create_channel(ChannelData,message,bot)
      break;
    case "delete":
      channel.delete_channel_User(message)
      break;
    case "archiv":
      channel.delete_channel_Admin(PingData,message)
      break;
    case "unlink":
      channel.unlink_channel_Admin(PingData,message)
      break;
    case "chstats":
      channel.chstats_channel_User(message,PingData)
      break;
    case "transfer":
      Cxc.transfer_cxc(PingData, NewCxc, message);
      break;
    case "bye":
      cxgifs.bye_gif(message)
      break;
    case "happy":
      cxgifs.happy_gif(message);
      break;
    case "klick":
      cxgifs.klick_gif(message);
      break;
    case "point":
      cxgifs.point_gif(message);
      break;
    case "sad":
      cxgifs.sad_gif(message);
      break;
    case "spock":
      cxgifs.spock_gif(message);
      break;
    case "lebelangundinfrieden":
      cxgifs.spock_gif(message);
      break;
    case "thumbs":
      cxgifs.thumbs_gif(message);
      break;
    case "dbupdate":
      dbupdate.update(message);
      break;
    case "reset":
      addprofile.reset_Profile(PingData,message);
      break;
    case "stats":
      stats.stats(message);
      break;
  };
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
