const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "*";

const ytdl = require('ytdl-core');

const queue = new Map();

var servers = {};

client.login(process.env.TOKEN);

function play(connection, message) {
  
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() { 
    if (server.queue[0]) play(connection, message);

    else connection.disconnect();

  });
}

client.on("ready", () => {

    console.log("Je suis prêt à executer tes commandes!");
    client.user.setGame("dauqs.exe");

});

client.on('message', async message => { 

    if(message.content === "Bonjour"){
        message.reply("Salut");
        console.log('Le bot dit bonjour');
    }

    if(message.content === prefix + "help") {
      var aide_embed = new Discord.RichEmbed()
      .setColor('#CC0000')
      .setTitle(`:trident: **DAUQS** :trident:`)
      .setDescription(`__Voici les informations à propos de la Dauqs__`)
      .addField(":first_place: Fondateur", "**UKAI** est le Fondateur de la Dauqs")
      .addField(":second_place: Membres", "**TAYG**, **Flygon** et **Pazuuuu** sont les membres de la Dauqs")
      .setFooter("Menu d'informations - Dauqs.exe")
      .setTimestamp()
      message.channel.send(aide_embed);
    }
});
