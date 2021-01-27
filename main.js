const Discord = require('discord.js');

const client = new Discord.Client();

const { token, prefix } = require('./config.json');

['commands'].forEach(x => client[x] = new Discord.Collection());
['command'].forEach(x => require(`./handlers/${x}`)(client, Discord));


client.login(token) 