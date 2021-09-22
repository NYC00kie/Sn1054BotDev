//importing of modules
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
const manageprofile = require("./commands/manageprofile");
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
const start = require('./commands/start');
const SNUpdate = require('./commands/SNUpdate');
const Faktcheck = require('./commands/Faktcheck');
const Watchblacklist = require('./commands/watchblacklist');
const howmany = require('./commands/howmany');
const top = require('./commands/toplist');
const trello = require('./commands/trello');
const count = require('./commands/count');
const ping = require('./commands/ping');
const morenvc = require('./methodes/morenvc');
//beginning of the Code
let bot = new Discord.Client({ws:{intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_PRESENCES"]}});

const token = process.env.Trellotoken
const key = process.env.Trellokey

async function rewriteVersion(){
  let output = await getVersion()
  Version2 = output.Version.split(".")


  let finalVersion= Number(Version2[1])+1
  var data = {
    Version: Version2[0]+"."+finalVersion,
    Date: Date("now")
  }
  var data = JSON.stringify(data)

  fs.writeFile("Version.json",data, 'utf8',err => {
    if (err) {
      console.error(err)
    }
  })
}
rewriteVersion()

bot.login(process.env.TOKEN);
bot.on('error',console.error)
bot.on('ready', async () => {
  bot.user.setPresence({ activity: { name: 'type .help',type:0},status: 'online' })
  .catch(console.error);
  try {
    let link = await bot.generateInvite({permissions:['ADMINISTRATOR']});
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

bot.on("guildMemberUpdate", function(oldMember, newMember){
  console.log(newMember)
    if (oldMember._roles != newMember._roles) {
      for (var i = 0; i < oldMember._roles.length; i++) {
        if (oldMember._roles[i]=="518385317229625364") {
          return;
        }
      }
      for (var j = 0; j < newMember._roles.length; j++) {
        if (newMember._roles[j]=="518385317229625364"){
          bot.channels.cache.get("727919338606166096").send(`<@${newMember.user.id}> Willkommen und schön, dass du es bis hier her geschafft hast 👍`)
          return;
        }
      }
    }

});

bot.on("guildMemberAdd" , member => {
  manageprofile.add_Profile_new(member);//addprofile to DB when entering the Server
})

bot.on("guildMemberRemove" , member => {
  manageprofile.remove_Profile(member);//removeprofile from DB when leaving the server
})

//Execute Commands
bot.on("message",async message => {

  if (message.author.bot) {
    return;//leave if the Author is a Bot or the Bot itself
  };

  count.message_count(message)
  checkblacklist.suizid(message)
  if (message.channel instanceof Discord.DMChannel)return;//return if the Channel the message got send in is the PM channel
  manageprofile.add_Profile_old(message);
  if (!message.content.startsWith(PREFIX)) {
    if (!checkblacklist.check_word(message)) {

      if (message.channel.id != "518446638335918080") {
        Cxc.add_cxc(message);
        await sleep(1000);
        Cxcdaily.add_cxc(message);
        morenvc.morenvc(message);
      }
      else {
        message.delete({timeout:1000})
      }

    }

  }//return if there is no Prefix
  else {
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
    let Begriff = message.content.substr(PREFIX.length + args[0].length+1, 128)
    //all Commands
    switch (args[0].toLowerCase()) {
      case "chtop":
        top.channeltop(message)
        break;
      case "channeltop":
        top.channeltop(message)
        break;
      case "addblacklist":
        blacklist.add_word(message,Word)
        break;
      case "addchannel":
        blacklist.add_channel(message,Word)
        break;
      case "v":
        let data = getVersion()
        d1 = new Date(data.Date)

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        zero = ""
        if (d1.getMinutes()<10){
          zero = 0
        }
        message.channel.send(`Version ${data.Version} vom ${d1.getDate()}. ${months[d1.getMonth()]} ${d1.getFullYear()} ${d1.getHours()}:${zero}${d1.getMinutes()}`)
        break;
      case "amonunser":
        insider.AmonUnser(message)
        break;
      case "inversesquarelaw":
        insider.inversesquarelaw(message)
        break;
      case "lindernein":
        insider.LindnerNein(message)
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
      case "nvc":
        Cxc.get_cxc(PingData, message);
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
      case "givenvc":
        cxc.givecxc(PingData, message, NewCxc)
        break;
      case "remnvc":
        cxc.remcxc(PingData, message, NewCxc)
        break;
      case "setnvc":
        cxc.setcxc(PingData, message, NewCxc)
        break;
      case "buyemote":
        buyemote.buy_emote(RoleData,message)
        break;
      case "create":
        //message.channel.send("Um den Einstieg für die Neuen zu vereinfachen, ist dieses Modul, für eine kurze Zeit nach dem Update deaktivieren.")
        let channelbeschreibung = message.content.substr(PREFIX.length + args[0].length + args[1].length+1, 1000)
        let ChannelData = {
          name: args[1],
          beschreibung: channelbeschreibung
          }
        channel.create_channel(ChannelData,message,bot)
        break;
      case "delete":
        channel.delete_channel_User(PingData,message)
        break;
      case "archiv":
        channel.delete_channel_Admin(PingData,message)
        break;
      case "unlink":
        channel.unlink_channel_Admin(PingData,message)
        break;
      case "chstats":
        channel.chstats_channel_User(PingData,message)
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
        //dbupdate.update(message);
        break;
      case "reset":
        manageprofile.reset_Profile(PingData,message,bot);
        break;
      case "stats":
        stats.stats(message);
        break;
      case "start":
        start.start(message);
        break;
      case "snupdate":
        //SNUpdate.SNUpdate(message);
        this.message.channel.send("Die Datenbank ist schon geupdated")
        break;
      case "faktcheck":
        Faktcheck.check(message,Begriff);
        break;
      case "watchword":
        Watchblacklist.word(message);
        break;
      case "watchchannel":
        Watchblacklist.channel(message);
        break;
      case "nvctop":
        top.nvctop(message);
        break;
      case "pwtop":
        top.pwtop(message);
        break;
      case "messagetop":
        top.messagetop(message);
        break;
      case "dev":
        trello.whatsontrello(message,token,key);
        break;
      case "ey":
        trello.whatsontrello(message,token,key);
        break;
      case "ping":
        ping.ping(message,bot)
        break;
    };
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
//gets the current Bot Version from Version.json
function getVersion(){
  var data = fs.readFileSync('Version.json','utf8')
  var data2 = JSON.parse(data)

  return data2
}
