const Discord = require('discord.js');
const { prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);

client.on('message', message => {
    console.log(message.content);

    if (message.content === `${prefix}papa`) {
        message.channel.send('HA VINTO BOSSI!!!');
    } else if (message.content === `${prefix}raffa`) {
        message.channel.send('Doughie!');
    }

});