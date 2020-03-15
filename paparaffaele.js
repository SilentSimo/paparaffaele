const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'generale');
    const rules = member.guild.channels.cache.find(ch => ch.name === 'regole');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    const pope = member.guild.emojis.get("687311736264851484");
    channel.send(`Ciao ${member}! Benvenuto tra gli Italian Towelie!\nIo sono Papa Raffaele ${pope}\nQui ${rules} trovi il nostro regolamento!!\nSe qualcosa ancora non ti è chiaro...arrangiati...oppure chiedi in giro!!\nTi auguro di avere una bella esperienza qui con noi e di divertirti quanto ci divertiamo noi!!!`);
  });

client.login(token);

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    if (!client.commands.has(commandName)) return;
  
    const command = client.commands.get(commandName);
  
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
  
  });