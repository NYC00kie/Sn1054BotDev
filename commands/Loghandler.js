const Discord = require('discord.js');

exports.log = (message,User,User2,Type,Role,Channel) => {return;
  this.message = message;
  let LogEmbed = new Discord.MessageEmbed()
  if (Type == "daily") {
    var logmessage = `${User}\n hat 300 nvc bekommen`

  }else if (Type == "channelcreate") {
    var logmessage = `${User}\n hat den Kanal <#${Channel}> erstellt`

  }else if (Type == "channeldelete" ) {
    var logmessage =  `${User}\n hat den Kanal <#${Channel}> gelöscht`

  }else if (Type == "buyrole") {
    var logmessage =  `${User}\n hat die Rolle <&${Role}>  gekauft`

  }else if (Type == "sellrole") {
    var logmessage =  `${User}\n hat die Rolle <&${Role}> verkauft`

  }
  else if (Type == "sellroleall") {
    var logmessage =  `${User}\n hat alle Rollen verkauft`

  }
  else if (Type == "transfer") {
    var logmessage = `Betrag wurde von ${User} an ${User2} übertragen`

  }
  else if (Type == "channelarchiv") {
    var logmessage = `<#${Channel}>\n wurde von einem Admin archiviert`

  }
  else if (Type == "cxcgifs") {
    var logmessage = `${User}\n hat ${Role} gekauft`

  }
  else if (Type == "start") {
    var logmessage = `${User}\n hat sich freigeschaltet`

  }
  LogEmbed.setTitle(Type)
  LogEmbed.setColor(0xe19517)
  LogEmbed.addField(`${Type}`,`${logmessage}`)
  this.message.client.channels.cache.get("509757254862372883").send(LogEmbed)

}
