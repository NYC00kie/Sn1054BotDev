const Discord = require('discord.js');

exports.get_help = (message) => {
  this.message = message;

  var Helpembed = new Discord.RichEmbed()
  .setColor(0xe19517)
  .setTitle("ClixoomBot Commands:")
  .addField("Hinweise"," Achte darauf, dass du vor jeden Befehl einen . setzen musst. \nBeispiel: ``.help`` \nAchtung! Benutze keine eckigen Klammern in den Befehlen:\n ``.transfer @user [betrag] = .transfer @Maxmustermann#0000 1000`` \n\nAußerdem solltest du allgemein darauf achten, dass du den Syntax und die Rechtschreibung des Befehls richtig nutzt.")
  .addField("Allgemein","``.help`` - Zeigt dir dieses Hilfe-Menü \n``.changelog`` - Zeigt dir eine Liste von Veränderungen an diesem Bot \n``.profil`` - Zeigt dir dein Clixoom-Profil (mit deinem Guthaben, etc.) \n``.profil @user`` - Zeigt dir das Clixoom-Profil von @user (In Progress) \n``.shop`` - Zeigt dir eine Liste aller Items und Shop-Befehle")
  .addField("Währungsbefehle",".nvc - Damit kannst du sehen, wie viele Nova-Coins du gesammelt hast\n ``.nvc @user`` - Damit kannst du sehen, wie viele Nova-Coins @user gesammelt hat\n ``.transfer @user [betrag]`` - Damit sendest du @user eine gewünschte Anzahl an Nova-Coins \n ``.nvctop``(not yet configured) - Damit siehst du die reichsten Leute auf dem Server\n ``.spenttop`` (not yet configured)- Damit siehst du die Leute, die am meisten Nova-Coins ausgegeben haben \n **ACHTUNG! Die Rollen bei Befehlen immer klein schreiben!**\n Bsp.: ``.buyrole schwarzes-loch``")
  .addField("Kanalsystem","Hinweise:\n Diese System ist nur für wissenschaftliche Themen gedacht! Andere Themen werden sofort gelöscht.\n Den Namen des Kanals immer ohne Leerzeichen schreiben (Die Beschreibung darf Leerzeichen enthalten)\n Eigene Kanäle können erst gelöscht werden, wenn 24h nichts mehr in ihnen geschrieben wurde.\n Nachdem man seinen Kanal geschlossen hat erhält man eine kleine Belohnung in Form von Nova-Coins (die Anzahl richtet sich nach der vorherigen Aktivität des Channels)\n Missbrauch in Form von Spam usw. wird nicht tolleriert.\n ``.create [name] [beschreibung]`` - Erstellt einen eigenen Diskussionskanal\n ``.chstats`` - Zeigt dir Statistiken zu deinem Kanal an\n ``.delete`` - Löscht deinen eigenen Kanal")
  .addField("Zusätzliches","Bei Problemen mit diesem Bot kann man sich gerne bei mir über Discord melden:\n <@376394812888186890> , oder beim Clixoom Discord Team.\nMehr Befehle kommen bald. Vorschläge kannst du in den Chat <#518388012149899294> schreiben.\n Bugs sind bitte direkt bei mir oder beim Clixoom Discord Team zu melden.\n Viel Spaß c:")
  .setFooter("erstellt von: Clara und Nici ")
  this.message.author.send(Helpembed);
      console.log("help executed")
  this.message.channel.send("Alle Commands wurden dir Privat zugesendet")
  .catch(err => {
    this.message.channel.send("Help kann nicht gesendet werden. Du hast deine Privaten Nachrichten deaktiviert.")
    console.error(err);
  })

}

exports.get_shophelp = (message) => {
  this.message = message;
  var ShopHelpembed = new Discord.RichEmbed()
  .setColor(0xe19517)
  .setTitle("ClixoomBot Shop")
  .addField("Commands",".shop -> Alle Items anzeigen\n ``.buyemote [Itemname]``-> Ein Gif kaufen\n ``.buyrole [Itemname]`` -> Eine Rolle kaufen\n ``.sellrole [Itemnname]`` -> Eine verkaufbare Rolle verkaufen (5% Wertverlust)\n Die Commands ohne Klammern schreiben\n Bsp.: ``.buyemote happy``")
  .addField("Allgemeine Leistungen","Nickname ändern:\n ``.changenick [neuer Nickname]`` - ändert deinen Nickname\n Kosten: 400 Nova-Coins")
  .addField("Emotes (Gif's)","Gifs, die man mit den jeweiligen Befehlen in den Chat beschwören kann.\n NICHT VERKAUFBAR!\n happy - 1000 Nova-Coins [``.happy``]\n sad - 1000 Nova-Coins [``.sad``]\n spock - 1000 Nova-Coins [``.spock``]\n thumbsup - 1000 Nova-Coins [``.thumbsup``]\n bye - 1000 Nova-Coins [``.bye``]\n point - 1000 Nova-Coins [``.point``]\n click - 1000 Nova-Coins [``.click``]")
  .addField("Rollen zum Kaufen","quasar = dunkel Orange (``.buyrole quasar``)\n Kaufen: 115'000 Nova-Coins Verkaufen: 109'250 Nova-Coins\npulsar = helles Hellblau (``.buyrole pulsar``)\n Kaufen: 95'000 Nova-Coins Verkaufen: 90'250 Nova-Coins\n schwarzes-loch = schwarz (``.buyrole schwarzes-loch``)\n Kaufen: 80'000 Nova-Coins Verkaufen: 76'000 Nova-Coins\n neutronen-stern = Hellblau (``.buyrole neutronen-stern``)\n Kaufen: 75'000 Nova-Coins Verkaufen: 71'250 Nova-Coins\n supernova = Weiß (``.buyrole supernova``)")
   .addField("឵឵ ឵឵ ឵឵","Kaufen: 50'000 Nova-Coins Verkaufen: 47'500‬ Nova-Coins\n roter-riese = Rot (``.buyrole roter-riese``)\n Kaufen: 25'000 Nova-Coins Verkaufen: 23'750 Nova-Coins\n hauptreihenstern = Gelb (``.buyrole hauptreihenstern``)\n Kaufen: 20'000 Nova-Coins Verkaufen: 19'000 Nova-Coins\n weißer-zwerg = superhelles Blau (``.buyrole weißer-zwerg``)\n Kaufen: 13'000 Nova-Coins Verkaufen: 12'350 Nova-Coins\n roter-zwerg = helles braun-rot (``.buyrole roter-zwerg``)\n Kaufen: 10'000 Nova-Coins Verkaufen: 9'500 Nova-Coins\n brauner-zwerg = Beige (``.buyrole brauner-zwerg``)\n Kaufen: 8'000 Nova-Coins Verkaufen: 7'600 Nova-Coins\n gaswolke = dunkelblau (``.buyrole gaswolke``)\n Kaufen: 5'000 Nova-Coins Verkaufen: 4'750 Nova-Coins\n Memes = Zugriff auf den Memes-Kanal (``.buyrole memes``)\n Kaufen: 50 Nova-Coins")
  .addField("Zusätzliches","Bei Problemen mit diesem Bot kann man sich gerne bei mir über Discord melden:\n <@376394812888186890> , oder beim SN1054 Discord Team.\nMehr Befehle kommen bald. Vorschläge kannst du in den Chat #ideen-feedback schreiben.\n Bugs sind bitte direkt bei mir oder beim Clixoom Discord Team zu melden.\n Viel Spaß c:")
  .setFooter("erstellt von: und Nici")
  this.message.author.send(ShopHelpembed);
this.message.channel.send("Alle Shop Items wurden dir Privat zugesendet")
.catch(err => {
  this.message.channel.send("Help kann nicht gesendet werden. Du hast deine Privaten Nachrichten deaktiviert.")
  console.error(err);
})
  }
