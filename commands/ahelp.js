const Discord = require('discord.js');

exports.get_adminhelp = (message) => {
  this.message = message;
  if (!message.member.roles.some(role => role.id === "450742960678764544")){
    this.message.channel.send("Du hast keine Berechtigung dafür")
    return;
  }
  var AHelpembed = new Discord.RichEmbed()
  .setColor(0xe19517)
  .setTitle("ClixoomBot Admin Commands:")
  .addField("Befehle","``.givecxc @user [betrag]`` - Gibt @user [betrag] Cx-Coins\n ``.remcxc @user [betrag]`` - Entzieht @user [betrag] Cx-Coins\n NUR FÜR NOTFALL: ``.setcxc @user [betrag]``\n ``.stats`` - Zeigt dir ein paar Allgemeine Statistiken \n ``.archiv @user ``- Archiviert den Kanal von @user und gibt ihm die nötigen cxc\n ``.unlink @user`` - Nimmt @user die Rechte an seinem Kanal\n NUR FÜR NOTFALL: ``.link @user #kanal``(noch nicht in arbeit, weil es eher unwichtig ist)\n ``.reset @user ``Alles von dem user löschen")
  this.message.channel.send(AHelpembed);
      console.log("help executed")
}
