const fs = require('fs'); //node.js native filesystem

const Config = require('./settings.json')
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

//Command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
//command handler end


//ready event
client.on('ready', () => {
  console.log('Successfully logged in!')
  client.user.setActivity(`${Config.prefix}help`, {type: "PLAYING"})
});
//ready event end


client.on('message', message => {
	if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

	const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

client.login()