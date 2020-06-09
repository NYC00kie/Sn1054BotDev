const Discord = require('discord.js');
//cxc auslesen
exports.get_help = (message) => {
  this.message = message;

  var Helpembed = new Discord.RichEmbed()
  .setColor(0xe19517)
  .setTitle("ClixoomBot Commands:")
  .addField("Hinweise"," Achte darauf, dass du vor jeden Befehl einen . setzen musst. \nBeispiel: ``.help`` \nAchtung! Benutze keine eckigen Klammern in den Befehlen:\n ``.transfer @user [betrag] = .transfer @Maxmustermann#0000 1000`` \n\nAußerdem solltest du allgemein darauf achten, dass du den Syntax und die Rechtschreibung des Befehls richtig nutzt.")
  .addField("Allgemein","``.help`` - Zeigt dir dieses Hilfe-Menü \n``.changelog`` - Zeigt dir eine Liste von Veränderungen an diesem Bot \n``.profil`` - Zeigt dir dein Clixoom-Profil (mit deinem Guthaben, etc.) \n``.profil @user`` - Zeigt dir das Clixoom-Profil von @user (In Progress) \n``.shop`` - Zeigt dir eine Liste aller Items und Shop-Befehle")
  .addField("Währungsbefehle",".cxc - Damit kannst du sehen, wie viele Cx-Coins du gesammelt hast\n ``.cxc @user`` - Damit kannst du sehen, wie viele Cx-Coins @user gesammelt hat\n ``.transfer @user [betrag]`` - Damit sendest du @user eine gewünschte Anzahl an Cx-Coins \n ``.cxctop``(not yet configured) - Damit siehst du die reichsten Leute auf dem Server\n ``.spenttop`` (not yet configured)- Damit siehst du die Leute, die am meisten Cx-Coins ausgegeben haben \n **ACHTUNG! Die Rollen bei Befehlen immer klein schreiben!**\n Bsp.: ``.buyrole vip``")
  .addField("Kanalsystem","Hinweise:\n Diese System ist nur für wissenschaftliche Themen gedacht! Andere Themen werden sofort gelöscht.\n Den Namen des Kanals immer ohne Leerzeichen schreiben (Die Beschreibung darf Leerzeichen enthalten)\n Eigene Kanäle können erst gelöscht werden, wenn 24h nichts mehr in ihnen geschrieben wurde.\n Nachdem man seinen Kanal geschlossen hat erhält man eine kleine Belohnung in Form von Cx-Coins (die Anzahl richtet sich nach der vorherigen Aktivität des Channels)\n Missbrauch in Form von Spam usw. wird nicht tolleriert.\n ``.create [name] [beschreibung]`` - Erstellt einen eigenen Diskussionskanal\n ``.chstats`` - Zeigt dir Statistiken zu deinem Kanal an\n ``.delete`` - Löscht deinen eigenen Kanal")
  .addField("Was bald kommt...","- Mehr Rollen\n - Mehr Möglichkeiten um Cx-Coins zu verdienen\n - Einstellbare Profilfarben (bei .profil)\n - Mehr Slots für eigene Kanäle")
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
  .addField("Allgemeine Leistungen","Nickname ändern:\n ``.changenick [neuer Nickname]`` - ändert deinen Nickname\n Kosten: 400 Cx-Coins")
  .addField("Emotes (Gif's)","Gifs, die man mit den jeweiligen Befehlen in den Chat beschwören kann.\n NICHT VERKAUFBAR!\n happy - 1000 Cx-Coins [``.happy``]\n thumbsup - 1000 Cx-Coins [``.thumbsup``]\n bye - 1000 Cx-Coins [``.bye``]\n point - 1000 Cx-Coins [``.point``]\n click - 1000 Cx-Coins [``.click``]")
  .addField("Rollen zum Kaufen","Clixoomer = Hellblau (``.buyrole clixoomer``)\n Kaufen: 100'000 Cx-Coins Verkaufen: 95'000 Cx-Coins\n VIP = Goldorange (``.buyrole vip``)\n Kaufen: 82'500 Cx-Coins Verkaufen: 78'375 Cx-Coins\n Musk = Hellrot (``.buyrole musk``)\n Kaufen: 75'000 Cx-Coins Verkaufen: 71'250 Cx-Coins\n Hawking = Dunkelgrün (``.buyrole hawking``)\n Kaufen: 21'000 Cx-Coins Verkaufen: 19'950 Cx-Coins\n Einstein = Dunkelblau (``.buyrole einstein``)\n Kaufen: 21'000 Cx-Coins Verkaufen: 19'950 Cx-Coins\n Newton = Gelb (``.buyrole newton``)\n Kaufen: 13'000 Cx-Coins Verkaufen: 12'350 Cx-Coins\n Tesla = Orange (``.buyrole tesla``)\n Kaufen: 13'000 Cx-Coins Verkaufen: 12'350 Cx-Coins\n Curie = Lavendel (``.buyrole curie``)\n Kaufen: 10'000 Cx-Coins Verkaufen: 9'500 Cx-Coins\n Boor = Blau (``.buyrole boor``)\n Kaufen: 8'000 Cx-Coins Verkaufen: 7'600 Cx-Coins\n Stammgast = Weißgrün (``.buyrole stammgast``)\n Kaufen: 5'000 Cx-Coins Verkaufen: 4'750 Cx-Coins\n Memes = Zugriff auf den Memes-Kanal (``.buyrole memes``)\n Kaufen: 50 Cx-Coins Verkaufen: 45 Cx-Coins")
  .addField("Zusätzliches","Bei Problemen mit diesem Bot kann man sich gerne bei mir über Discord melden:\n <@376394812888186890> , oder beim Clixoom Discord Team.\nMehr Befehle kommen bald. Vorschläge kannst du in den Chat #ideen schreiben.\n Bugs sind bitte direkt bei mir oder beim Clixoom Discord Team zu melden.\n Viel Spaß c:")
  .setFooter("erstellt von: Clara und Nici")
  this.message.author.send(ShopHelpembed);
this.message.channel.send("Alle Shop Items wurden dir Privat zugesendet")
.catch(err => {
  this.message.channel.send("Help kann nicht gesendet werden. Du hast deine Privaten Nachrichten deaktiviert.")
  console.error(err);
})
  }
