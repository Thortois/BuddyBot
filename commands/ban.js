const Discord = require("discord.js");
const { logsChannel } = require('../config.json');

module.exports = {
    name: 'ban',
    aliases: [],
    description: 'Ban a user',
    usage: '<user> <reason>',
    cooldown: 0,
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
    args: true,
    execute(message, args) {
        let mention = message.mentions.users.first()
        let user = message.guild.member(mention);
        user.ban().then(() => {
            var banned = new Discord.MessageEmbed() 
                .setAuthor(`Success!`, ("https://cdn.discordapp.com/attachments/447558366076731394/448089730073231360/unknown.png"))
                .setColor(`#15ff00`)
                .setTimestamp()
                .setDescription(`Ban successfull!`)
            const channel = message.guild.channels.cache.get(logsChannel);    
            channel.send(banned);
        });
        
    },
}